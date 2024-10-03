import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderContactPersonApiService from 'src/services/stakeholder/stakeholder-contact-person-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderContactPersonCard from './stakeholder-contact-person-card';
import StakeholderContactPersonDrawer from './stakeholder-contact-person-drawer';

function StakeholderContactPersonList({ stakeholderId }: { type: string; stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderContactPerson | null>(null);
  const fetchStakeholderContactPersons = (params: GetRequestParam): Promise<IApiResponse<StakeholderContactPerson[]>> => {
    return stakeholderContactPersonApiService.getAll({ ...params, filter: { ...params.filter } });
  };

  const {
    data: stakeholderContactPersons,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderContactPerson[]>({
    queryKey: ['stakeholderContactPersons'],
    fetchFunction: fetchStakeholderContactPersons
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderContactPerson);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderContactPerson: StakeholderContactPerson) => {
    toggleDrawer();
    setSelectedRow(stakeholderContactPerson);
  };
  const handleDelete = async (stakeholderContactPersonId: string) => {
    await stakeholderContactPersonApiService.delete(stakeholderContactPersonId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderContactPersonDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderContactPerson={selectedRow as StakeholderContactPerson}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-contact-person.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderContactPersonCard stakeholderContactPerson={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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
        items={stakeholderContactPersons || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderContactPersonList;
