import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderPhoneApiService from 'src/services/stakeholder/stakeholder-phone-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderPhone } from 'src/types/stakeholder';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderPhoneCard from './stakeholder-phone-card';
import StakeholderPhoneDrawer from './stakeholder-phone-drawer';

function StakeholderPhoneList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderPhone | null>(null);
  const fetchStakeholderPhones = (params: GetRequestParam): Promise<IApiResponse<StakeholderPhone[]>> => {
    return stakeholderPhoneApiService.getAll({ ...params, filter: { ...params.filter, stakeholder_id: stakeholderId } });
  };

  const {
    data: stakeholderPhones,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderPhone[]>({
    queryKey: ['stakeholderPhones'],
    fetchFunction: fetchStakeholderPhones
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderPhone);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderPhone: StakeholderPhone) => {
    toggleDrawer();
    setSelectedRow(stakeholderPhone);
  };
  const handleDelete = async (stakeholderPhoneId: string) => {
    await stakeholderPhoneApiService.delete(stakeholderPhoneId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderPhoneDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderPhone={selectedRow as StakeholderPhone}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-phone.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderPhoneCard stakeholderPhone={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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
        items={stakeholderPhones || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderPhoneList;
