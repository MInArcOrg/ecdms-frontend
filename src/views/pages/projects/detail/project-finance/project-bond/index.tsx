import { Box } from '@mui/material';
import { useState } from 'react';

import { useQuery } from '@tanstack/react-query';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectBondApiService from 'src/services/project/project-bond-service';
import projectFinanceApiService from 'src/services/project/project-finance-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { ProjectBond, ProjectGeneralFinance } from 'src/types/project/project-finance';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectBondCard from './project-bond-card';
import ProjectBondDrawer from './project-bond-drawer';

function ProjectBondList({ type, projectId }: { type: string; projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectBond | null>(null);
  const fetchProjectBonds = (params: GetRequestParam): Promise<IApiResponse<ProjectBond[]>> => {
    return projectBondApiService.getAll({
      ...params,
      filter: { ...params.filter, type: type }
    });
  };

  const {
    data: projectBonds,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectBond[]>({
    queryKey: ['projectBonds', type],
    fetchFunction: fetchProjectBonds
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectBond);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectBond: ProjectBond) => {
    toggleDrawer();
    setSelectedRow(projectBond);
  };
  const handleDelete = async (projectBondId: string) => {
    await projectBondApiService.delete(projectBondId);
    refetch();
  };
  const { data: projectGeneralFinance } = useQuery({
    queryKey: ['projectFinanceData', projectId],
    queryFn: () => projectFinanceApiService.getProjectGeneralFinance(projectId, {}) // Replace with your API call
  });
  return (
    <Box>
      {showDrawer && (
        <ProjectBondDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectBond={selectedRow as ProjectBond}
          refetch={refetch}
          type={type}
          projectId={projectId}
          projectGeneralFinance={projectGeneralFinance?.payload as ProjectGeneralFinance}
        />
      )}
      <ItemsListing
        title={`project.project-bond.project-${type.toLocaleLowerCase()}`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectBondCard onDelete={handleDelete} type={type} onEdit={handleEdit} refetch={refetch} projectBond={data} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'bonds'
          }
        }}
        fetchDataFunction={refetch}
        items={projectBonds || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectBondList;
