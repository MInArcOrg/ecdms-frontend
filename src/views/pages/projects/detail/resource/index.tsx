import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectResourceApiService from 'src/services/project/project-resource-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';

import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectResourceCard from './project-resource-card';
import ProjectResourceDrawer from './project-resource-drawer';
import { projectResourceColumns } from './project-resource-row';
import { useTranslation } from 'react-i18next';
import { ProjectResource } from 'src/types/project/project-resource';
import { useRouter } from 'next/router';

function ProjectResourceList({ projectId }: { projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const router = useRouter();

  const [selectedRow, setSelectedRow] = useState<ProjectResource | null>(null);
  const fetchProjectResources = (params: GetRequestParam): Promise<IApiResponse<ProjectResource[]>> => {
    return projectResourceApiService.getAll({
      ...params,
      filter: { ...params.filter }
    });
  };

  const { t } = useTranslation();

  const {
    data: projectResources,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectResource[]>({
    queryKey: ['projectResources'],
    fetchFunction: fetchProjectResources
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectResource);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectResource: ProjectResource) => {
    toggleDrawer();
    setSelectedRow(projectResource);
  };
  const handleDelete = async (projectResourceId: string) => {
    await projectResourceApiService.delete(projectResourceId);
    refetch();
  };
  const handleClickDetail = (projectResource: ProjectResource) => {
    router.push(`/resources/${projectResource.resource?.resourcetype_id}/details/${projectResource.resource?.id}/`);
  };
  return (
    <Box>
      {showDrawer && (
        <ProjectResourceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectResource={selectedRow as ProjectResource}
          refetch={refetch}
          projectId={projectId}
          projectResources={projectResources || []}
        />
      )}
      <ItemsListing
        title={`project.resource.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectResourceCard
            onEdit={handleEdit}
            onDetail={handleClickDetail}
            projectResource={data}
            onDelete={handleDelete}
            refetch={refetch}
          />
        )}
        tableProps={{
          headers: projectResourceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'projectresource'
          }
        }}
        fetchDataFunction={refetch}
        items={projectResources || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectResourceList;
