import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderOperationLocationApiService from 'src/services/stakeholder/stakeholder-operation-location-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderOperationLocation } from 'src/types/stakeholder/stakeholder-operation-location';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderOperationLocationCard from './stakeholder-operation-location-card';
import StakeholderOperationLocationDrawer from './stakeholder-operation-location-drawer';

function StakeholderOperationLocationList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderOperationLocation | null>(null);
  const fetchStakeholderOperationLocations = (params: GetRequestParam): Promise<IApiResponse<StakeholderOperationLocation[]>> => {
    return stakeholderOperationLocationApiService.getAll({ ...params, filter: { ...params.filter, stakeholder_id: stakeholderId } });
  };

  const {
    data: stakeholderOperationLocations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderOperationLocation[]>({
    queryKey: ['stakeholderOperationLocations'],
    fetchFunction: fetchStakeholderOperationLocations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderOperationLocation);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderOperationLocation: StakeholderOperationLocation) => {
    toggleDrawer();
    setSelectedRow(stakeholderOperationLocation);
  };
  const handleDelete = async (stakeholderOperationLocationId: string) => {
    await stakeholderOperationLocationApiService.delete(stakeholderOperationLocationId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderOperationLocationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderOperationLocation={selectedRow as StakeholderOperationLocation}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-operation-location.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderOperationLocationCard
            stakeholderOperationLocation={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'certificate'
          }
        }}
        fetchDataFunction={refetch}
        items={stakeholderOperationLocations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderOperationLocationList;
