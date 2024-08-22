import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectExtensionTimeApiService from 'src/services/project/project-extension-time-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { ProjectExtensionTime } from 'src/types/project/project-time';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectExtensionTimeCard from './project-extension-time-card';
import ProjectExtensionTimeDrawer from './project-extension-time-drawer';

function ProjectExtensionTimeList({ projectId }: { type: string; projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectExtensionTime | null>(null);
  const fetchProjectExtensionTimes = (params: GetRequestParam): Promise<IApiResponse<ProjectExtensionTime[]>> => {
    return projectExtensionTimeApiService.getAll({ ...params, filter: { ...params.filter } });
  };

  const {
    data: projectExtensionTimes,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectExtensionTime[]>({
    queryKey: ['projectExtensionTimes'],
    fetchFunction: fetchProjectExtensionTimes
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectExtensionTime);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectExtensionTime: ProjectExtensionTime) => {
    toggleDrawer();
    setSelectedRow(projectExtensionTime);
  };
  const handleDelete = async (projectExtensionTimeId: string) => {
    await projectExtensionTimeApiService.delete(projectExtensionTimeId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ProjectExtensionTimeDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectExtensionTime={selectedRow as ProjectExtensionTime}
          refetch={refetch}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.project-extension-time.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.grid.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectExtensionTimeCard projectExtensionTime={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'variations'
          }
        }}
        fetchDataFunction={refetch}
        items={projectExtensionTimes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectExtensionTimeList;
