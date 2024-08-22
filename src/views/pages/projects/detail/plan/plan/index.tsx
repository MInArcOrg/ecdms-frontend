import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectPlanApiService from 'src/services/project/project-plan-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';

import { ProjectPlan } from 'src/types/project/project-plan';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectPlanCard from './project-plan-card';
import ProjectPlanDrawer from './project-plan-drawer';
import { projectPlanColumns } from './project-plan-row';
import { useTranslation } from 'react-i18next';
import PlanDetail from './project-plan-detail';

function ProjectPlanList({ projectId }: { projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectPlan | null>(null);
  const fetchProjectPlans = (params: GetRequestParam): Promise<IApiResponse<ProjectPlan[]>> => {
    return projectPlanApiService.getAll({
      ...params,
      filter: { ...params.filter }
    });
  };
  const toggleDetailDrawer = () => {
    setSelectedRow({} as ProjectPlan);
    setShowDetailDrawer(!showDetailDrawer);
  };
  const { t } = useTranslation();
  const {
    data: projectPlans,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectPlan[]>({
    queryKey: ['projectPlans'],
    fetchFunction: fetchProjectPlans
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectPlan);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectPlan: ProjectPlan) => {
    toggleDrawer();
    setSelectedRow(projectPlan);
  };
  const handleDelete = async (projectPlanId: string) => {
    await projectPlanApiService.delete(projectPlanId);
    refetch();
  };
  const handleClickDetail = (projectPlan: ProjectPlan) => {
    toggleDetailDrawer();
    setSelectedRow(projectPlan);
  };
  return (
    <Box>
      {showDetailDrawer && (
        <PlanDetail projectPlan={selectedRow as ProjectPlan} show={showDetailDrawer} toggleDetail={toggleDetailDrawer} />
      )}
      {showDrawer && (
        <ProjectPlanDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectPlan={selectedRow as ProjectPlan}
          refetch={refetch}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.plan.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectPlanCard onDetail={handleClickDetail} onEdit={handleEdit} projectPlan={data} onDelete={handleDelete} refetch={refetch} />
        )}
        tableProps={{
          headers: projectPlanColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'projectplan'
          }
        }}
        fetchDataFunction={refetch}
        items={projectPlans || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectPlanList;
