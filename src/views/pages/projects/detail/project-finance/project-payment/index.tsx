import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectPaymentApiService from 'src/services/project/project-payment-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { ProjectPayment } from 'src/types/project/project-finance';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import ProjectPaymentCard from './project-payment-card';
import ProjectPaymentDrawer from './project-payment-drawer';

function ProjectPaymentList({ type, projectId }: { type: string; projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<ProjectPayment | null>(null);
  const fetchProjectPayments = (params: GetRequestParam): Promise<IApiResponse<ProjectPayment[]>> => {
    return projectPaymentApiService.getAll({ ...params, filter: { ...params.filter, type: type } });
  };

  const {
    data: projectPayments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<ProjectPayment[]>({
    queryKey: ['projectPayments', type],
    fetchFunction: fetchProjectPayments
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectPayment);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectPayment: ProjectPayment) => {
    toggleDrawer();
    setSelectedRow(projectPayment);
  };
  const handleDelete = async (projectPaymentId: string) => {
    await projectPaymentApiService.delete(projectPaymentId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <ProjectPaymentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectPayment={selectedRow as ProjectPayment}
          refetch={refetch}
          type={type}
          projectId={projectId}
        />
      )}
      <ItemsListing
        title={`project.project-${type.toLocaleLowerCase()}.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <ProjectPaymentCard type={type} onEdit={handleEdit} refetch={refetch} projectPayment={data} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'payments'
          }
        }}
        fetchDataFunction={refetch}
        items={projectPayments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default ProjectPaymentList;
