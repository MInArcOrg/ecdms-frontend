'use client';

import { Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { DrainageMaintenance } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import DrainageMaintenanceCard from './drainage-maintenance-card';
import DrainageMaintenanceDrawer from './drainage-maintenance-drawer';
import { drainageMaintenanceColumns } from './drainage-maintenance-row';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

interface DrainageMaintenanceListProps {
    otherSubMenu?: DetailSubMenuItemChild;
    typeId: string;
    projectId: string;
}

const DrainageMaintenanceList: React.FC<DrainageMaintenanceListProps> = ({ otherSubMenu, projectId }) => {
    const [showDrawer, setShowDrawer] = useState(false);
    const [showDetailDrawer, setShowDetailDrawer] = useState(false);
    const [selectedRow, setSelectedRow] = useState<DrainageMaintenance | null>(null);
    const { t } = useTranslation();

    const fetchDrainageMaintenances = (params: GetRequestParam): Promise<IApiResponse<DrainageMaintenance[]>> =>
        projectOtherApiSecondService<DrainageMaintenance>().getAll(otherSubMenu?.apiRoute || '', {
            ...params,
            filter: { ...params.filter, project_id: projectId }
        });

    const {
        data: drainageMaintenances,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<DrainageMaintenance[]>({
        queryKey: ['drainage-maintenances', projectId],
        fetchFunction: fetchDrainageMaintenances
    });

    const toggleDrawer = () => {
        setSelectedRow({} as DrainageMaintenance);
        setShowDrawer(!showDrawer);
    };

    const toggleDetailDrawer = () => {
        setSelectedRow({} as DrainageMaintenance);
        setShowDetailDrawer(!showDetailDrawer);
    };

    const handleEdit = (item: DrainageMaintenance) => {
        toggleDrawer();
        setSelectedRow(item);
    };

    const handleDelete = async (id: string) => {
        await projectOtherApiService<DrainageMaintenance>().delete(otherSubMenu?.apiRoute || '', id);
        refetch();
    };

    const handleClickDetail = (item: DrainageMaintenance) => {
        toggleDetailDrawer();
        setSelectedRow(item);
    };

    const mapToDetailItems = (item: DrainageMaintenance) => [
        {
            title: t('project.other.drainage-maintenance.details.road-segment-id'),
            value: item.roadSegment?.name || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.soil-type-id'),
            value: item.soilType?.title || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.ground-water-impact-id'),
            value: item.groundWaterImpact?.title || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.soil-bearing-capacity'),
            value: item.soil_bearing_capacity || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.slope-stability-id'),
            value: item.slopeStability?.title || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.retaining-walls'),
            value: item.retaining_walls ? t('common.yes') : t('common.no')
        },
        {
            title: t('project.other.drainage-maintenance.details.geological-hazard'),
            value: item.geological_hazard || 'N/A'
        },
        {
            title: t('project.other.drainage-maintenance.details.remark'),
            value: item.remark || 'N/A'
        },
        {
            title: t('common.table-columns.created-at'),
            value: item.created_at ? formatCreatedAt(item.created_at) : 'N/A'
        }
    ];

    return (
        <Box>
            {showDrawer && (
                <DrainageMaintenanceDrawer
                    otherSubMenu={otherSubMenu}
                    open={showDrawer}
                    toggle={toggleDrawer}
                    drainageMaintenance={selectedRow as DrainageMaintenance}
                    refetch={refetch}
                    projectId={projectId}
                />
            )}

            {showDetailDrawer && selectedRow && (
                <OtherDetailSidebar
                    show={showDetailDrawer}
                    toggleDrawer={toggleDetailDrawer}
                    data={mapToDetailItems(selectedRow)}
                    hasReference={true}
                    id={selectedRow.id || ''}
                    fileType={uploadableProjectFileTypes.other.drainageMaintenance}
                    title={t('project.other.drainage-maintenance.drainage-maintenance-details')}
                />
            )}

            <ItemsListing
                title={t('project.other.drainage-maintenance.title')}
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                tableProps={{
                    headers: drainageMaintenanceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
                }}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <DrainageMaintenanceCard
                        onDetail={handleClickDetail}
                        drainageMaintenance={data}
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
                        subject: 'drainagemaintenance'
                    }
                }}
                fetchDataFunction={refetch}
                items={drainageMaintenances || []}
                onPaginationChange={handlePageChange}
            />
        </Box>
    );
};

export default DrainageMaintenanceList;
