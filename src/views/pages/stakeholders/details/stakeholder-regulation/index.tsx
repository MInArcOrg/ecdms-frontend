import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderRegulationApiService from 'src/services/stakeholder/stakeholder-regulation-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderRegulation } from 'src/types/stakeholder/stakeholder-regulation';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderRegulationCard from './stakeholder-regulation-card';
import StakeholderRegulationDrawer from './stakeholder-regulation-drawer';

function StakeholderRegulationList({ stakeholderId }: { stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderRegulation | null>(null);
  const fetchStakeholderRegulations = (params: GetRequestParam): Promise<IApiResponse<StakeholderRegulation[]>> => {
    return stakeholderRegulationApiService.getAll({ ...params, filter: { ...params.filter } });
  };

  const {
    data: stakeholderRegulations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderRegulation[]>({
    queryKey: ['stakeholderRegulations'],
    fetchFunction: fetchStakeholderRegulations
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderRegulation);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderRegulation: StakeholderRegulation) => {
    toggleDrawer();
    setSelectedRow(stakeholderRegulation);
  };
  const handleDelete = async (stakeholderRegulationId: string) => {
    await stakeholderRegulationApiService.delete(stakeholderRegulationId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderRegulationDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderRegulation={selectedRow as StakeholderRegulation}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-regulation.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderRegulationCard stakeholderRegulation={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'regulation'
          }
        }}
        fetchDataFunction={refetch}
        items={stakeholderRegulations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderRegulationList;
