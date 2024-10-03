import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderTrainingApiService from 'src/services/stakeholder/stakeholder-training-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderTraining } from 'src/types/stakeholder/stakeholder-training';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderTrainingCard from './stakeholder-training-card';
import StakeholderTrainingDrawer from './stakeholder-training-drawer';

function StakeholderTrainingList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderTraining | null>(null);
  const fetchStakeholderTrainings = (params: GetRequestParam): Promise<IApiResponse<StakeholderTraining[]>> => {
    return stakeholderTrainingApiService.getAll({ ...params, filter: { ...params.filter } });
  };

  const {
    data: stakeholderTrainings,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderTraining[]>({
    queryKey: ['stakeholderTrainings'],
    fetchFunction: fetchStakeholderTrainings
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderTraining);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderTraining: StakeholderTraining) => {
    toggleDrawer();
    setSelectedRow(stakeholderTraining);
  };
  const handleDelete = async (stakeholderTrainingId: string) => {
    await stakeholderTrainingApiService.delete(stakeholderTrainingId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderTrainingDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderTraining={selectedRow as StakeholderTraining}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-training.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderTrainingCard stakeholderTraining={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'training'
          }
        }}
        fetchDataFunction={refetch}
        items={stakeholderTrainings || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderTrainingList;
