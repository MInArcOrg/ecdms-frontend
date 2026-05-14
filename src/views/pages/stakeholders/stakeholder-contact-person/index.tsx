import { Box } from '@mui/material';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderContactPersonApiService from 'src/services/stakeholder/stakeholder-contact-person-service';
import masterTypeApiService from 'src/services/master-data/master-type-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderContactPerson } from 'src/types/stakeholder/stakeholder-contact-person';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderContactPersonCard from './stakeholder-contact-person-card';
import StakeholderContactPersonDrawer from './stakeholder-contact-person-drawer';

function StakeholderContactPersonList({
  stakeholderId,
  typeId
}: {
  type: string;
  stakeholderId: string;
  typeId?: string;
}) {
  const [showDrawer, setShowDrawer] = useState(false);
  const { t } = useTranslation();

  const [selectedRow, setSelectedRow] = useState<StakeholderContactPerson | null>(null);
  const fetchStakeholderContactPersons = (params: GetRequestParam): Promise<IApiResponse<StakeholderContactPerson[]>> => {
    return stakeholderContactPersonApiService.getAll({
      ...params,
      filter: { ...params.filter }
    });
  };

  const { data: stakeholderType } = useQuery({
    queryKey: ['stakeholder-type', String(typeId)],
    queryFn: () => masterTypeApiService.getOne('stakeholder', String(typeId), {}),
    enabled: !!typeId
  });

  const stripStakeholderFromTitle = (value: string) =>
    value.replace(/\b(Stakeholder|Stakholder)\b/gi, '').replace(/\s+/g, ' ').trim();

  const typeTitle = stakeholderType?.payload?.title;
  const listingTitle = typeTitle
    ? `${typeTitle} ${stripStakeholderFromTitle(t('stakeholder.stakeholder-contact-person.title'))}`
    : t('stakeholder.stakeholder-contact-person.title');

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
          typeTitle={stakeholderType?.payload?.title}
        />
      )}
      <ItemsListing
        title={listingTitle}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderContactPersonCard stakeholderContactPerson={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholdercontactperson'
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
