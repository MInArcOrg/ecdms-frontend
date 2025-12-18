'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectClaimApiService from 'src/services/project/project-claim-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ProjectClaimCard from './project-claim-card';
import ProjectClaimDrawer from './project-claim-drawer';
import type { ProjectClaim } from 'src/types/project/project-claim';
import { projectClaimColumns } from './project-claim-row';

interface ProjectClaimListProps {
    projectId: string;
}

const ProjectClaimList: React.FC<ProjectClaimListProps> = ({ projectId }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState<ProjectClaim | null>(null);
    const { t } = useTranslation();

    const fetchProjectClaims = (params: GetRequestParam): Promise<IApiResponse<ProjectClaim[]>> => {
        return projectClaimApiService.getAll({
            ...params,
            filter: { ...params.filter, project_id: projectId }
        });
    };

    const {
        data: projectClaims,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<ProjectClaim[]>({
        queryKey: ['projectClaims', projectId],
        fetchFunction: fetchProjectClaims
    });

    const toggleDrawer = () => {
        setSelectedRow({} as ProjectClaim);
        setShowDrawer(!showDrawer);
    };

    const toggleDetailDrawer = () => {
        setSelectedRow({} as ProjectClaim);
        setShowDetailDrawer(!showDetailDrawer);
    };

    const handleEdit = (projectClaim: ProjectClaim) => {
        setSelectedRow(projectClaim);
        setShowDrawer(true);
    };

    const handleDelete = async (projectClaimId: string) => {
        await projectClaimApiService.delete(projectClaimId);
        refetch();
    };

    const handleClickDetail = (projectClaim: ProjectClaim) => {
        setSelectedRow(projectClaim);
        setShowDetailDrawer(true);
    };

    const mapProjectClaimToDetailItems = (projectClaim: ProjectClaim): { title: string; value: string }[] => [
        {
            title: t('project.navigation.submenu.reporting.report.claim-title'),
            value: projectClaim?.title || 'N/A'
        },
        {
            title: t('project.navigation.submenu.reporting.report.claim-description'),
            value: projectClaim?.description || 'N/A'
        },
        {
            title: t('project.navigation.submenu.reporting.report.claim-measures-taken'),
            value: projectClaim?.measures_taken || 'N/A'
        },
        {
            title: t('common.table-columns.created-at'),
            value: projectClaim?.created_at ? formatCreatedAt(projectClaim.created_at) : 'N/A'
        }
    ];

    return (
        <Box>
            {showDrawer && (
                <ProjectClaimDrawer
                    open={showDrawer}
                    toggle={toggleDrawer}
                    projectClaim={selectedRow as ProjectClaim}
                    refetch={refetch}
                    projectId={projectId}
                />
            )}

            {showDetailDrawer && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapProjectClaimToDetailItems(selectedRow as ProjectClaim)}
                    id={selectedRow?.id || ''}
                    hasReference={false}
                    title={t('project.navigation.submenu.reporting.report.claim-details')}
                    fileType="projectClaim"
                />
            )}

            <ItemsListing
                title={t('project.navigation.submenu.reporting.report.claim')}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: projectClaimColumns(handleClickDetail, handleEdit, handleDelete, t)
                }}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <ProjectClaimCard
                        onDetail={handleClickDetail}
                        projectClaim={data}
                        onEdit={handleEdit}
                        refetch={refetch}
                        onDelete={handleDelete}
                    />
                )}
                createActionConfig={{
                    ...defaultCreateActionConfig,
                    onClick: toggleDrawer,
                    onlyIcon: false,
                    permission: {
                        action: 'create',
                        subject: 'claim'
                    }
                }}
                fetchDataFunction={refetch}
                items={projectClaims || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    );
};

export default ProjectClaimList;
