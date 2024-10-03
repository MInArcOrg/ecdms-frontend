import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderEmailApiService from 'src/services/stakeholder/stakeholder-email-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderEmail } from 'src/types/stakeholder';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderEmailCard from './stakeholder-email-card';
import StakeholderEmailDrawer from './stakeholder-email-drawer';

function StakeholderEmailList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderEmail | null>(null);
  const fetchStakeholderEmails = (params: GetRequestParam): Promise<IApiResponse<StakeholderEmail[]>> => {
    return stakeholderEmailApiService.getAll({ ...params, filter: { ...params.filter, stakeholder_id: stakeholderId } });
  };

  const {
    data: stakeholderEmails,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderEmail[]>({
    queryKey: ['stakeholderEmails'],
    fetchFunction: fetchStakeholderEmails
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderEmail);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderEmail: StakeholderEmail) => {
    toggleDrawer();
    setSelectedRow(stakeholderEmail);
  };
  const handleDelete = async (stakeholderEmailId: string) => {
    await stakeholderEmailApiService.delete(stakeholderEmailId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderEmailDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderEmail={selectedRow as StakeholderEmail}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-email.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderEmailCard stakeholderEmail={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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
        items={stakeholderEmails || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderEmailList;
