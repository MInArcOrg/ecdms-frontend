import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import jointVentureProjectApiService from 'src/services/stakeholder/joint-venture-project-service';
import projectApiService from 'src/services/project/project-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import { Project } from 'src/types/project';
import ItemsListing from 'src/views/shared/listing';
import JointVentureProjectCard from './joint-venture-project-card';
import { jointVentureProjectColumns } from './joint-venture-project-row';
import JointVentureProjectDrawer from './joint-venture-project-drawer';

const JointVentureProjectList = ({ stakeholderId, typeId }: { stakeholderId: string; typeId: string }) => {
    const { t } = useTranslation();

    const [drawerOpen, setDrawerOpen] = useState<boolean>(false);
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);

    const fetchProjects = (params: GetRequestParam): Promise<IApiResponse<Project[]>> => {
        return jointVentureProjectApiService.getAll(stakeholderId, {
            ...params
        });
    };

    const {
        data: projects,
        isLoading,
        pagination,
        handlePageChange,
        refetch
    } = usePaginatedFetch<Project[]>({
        queryKey: ['joint-venture-projects', stakeholderId],
        fetchFunction: fetchProjects
    });

    const handleDelete = async (projectId: string) => {
        await projectApiService.delete(projectId);
        refetch();
    };

    const toggleDrawer = () => {
        setDrawerOpen(!drawerOpen);
        if (drawerOpen) {
            setSelectedProject(null);
        }
    };

    return (
        <Box>
            <ItemsListing
                pagination={pagination}
                type={ITEMS_LISTING_TYPE.table.value}
                isLoading={isLoading}
                ItemViewComponent={({ data }) => (
                    <JointVentureProjectCard onDetail={() => { }} project={data} onDelete={handleDelete} t={t} refetch={refetch} />
                )}
                title={t('project.joint-venture.title', 'Joint Venture Projects')}
                createActionConfig={{
                    ...defaultCreateActionConfig,
                    onClick: toggleDrawer,
                    onlyIcon: false,
                    show: true,
                    permission: {
                        action: 'create',
                        subject: 'stakeholder'
                    }
                }}
                fetchDataFunction={refetch}
                tableProps={{
                    headers: jointVentureProjectColumns(handleDelete, t, refetch, typeId)
                }}
                items={projects || []}
                onPaginationChange={handlePageChange}
            />

            {drawerOpen && (
                <JointVentureProjectDrawer
                    open={drawerOpen}
                    toggle={toggleDrawer}
                    refetch={refetch}
                    project={selectedProject || {} as Project}
                    typeId={typeId}
                    stakeholderId={stakeholderId}
                />
            )}
        </Box>
    );
};
export default JointVentureProjectList;
