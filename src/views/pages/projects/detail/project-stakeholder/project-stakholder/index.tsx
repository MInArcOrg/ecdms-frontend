import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectStakeholderApiService from 'src/services/project/project-stakeholder-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';

import { ProjectStakeholder } from 'src/types/project/project-stakeholder';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectStakeholderCard from './project-stakeholder-card';
import ProjectStakeholderDrawer from './project-stakeholder-drawer';

function ProjectStakeholderList({ projectId }: { projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectStakeholder | null>(null);
  const fetchProjectStakeholders = (params: GetRequestParam): Promise<IApiResponse<ProjectStakeholder[]>> => {
    return projectStakeholderApiService.getAll({
      ...params,
      filter: { ...params.filter }
    });
  };

  const {
    data: projectStakeholders,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectStakeholder[]>({
    queryKey: ['projectStakeholders'],
    fetchFunction: fetchProjectStakeholders
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectStakeholder);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectStakeholder: ProjectStakeholder) => {
    toggleDrawer();
    setSelectedRow(projectStakeholder);
  };
  const handleDelete = async (projectStakeholderId: string) => {
    await projectStakeholderApiService.delete(projectStakeholderId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ProjectStakeholderDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectStakeholder={selectedRow as ProjectStakeholder}
          refetch={refetch}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.stakeholder.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.grid.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectStakeholderCard onEdit={handleEdit} projectStakeholder={data} onDelete={handleDelete} refetch={refetch} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'projectstakeholder'
          }
        }}
        fetchDataFunction={refetch}
        items={projectStakeholders || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectStakeholderList;
