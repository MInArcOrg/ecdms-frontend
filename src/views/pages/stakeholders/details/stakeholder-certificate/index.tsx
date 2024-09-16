import { Box } from '@mui/material';
import { useState } from 'react';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderCertificateApiService from 'src/services/stakeholder/stakeholder-certificate-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { StakeholderCertificate } from 'src/types/stakeholder/stakeholder-certificate';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderCertificateCard from './stakeholder-certificate-card';
import StakeholderCertificateDrawer from './stakeholder-certificate-drawer';

function StakeholderCertificateList({ stakeholderId }: { type: string; stakeholderId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);

  const [selectedRow, setSelectedRow] = useState<StakeholderCertificate | null>(null);
  const fetchStakeholderCertificates = (params: GetRequestParam): Promise<IApiResponse<StakeholderCertificate[]>> => {
    return stakeholderCertificateApiService.getAll({ ...params, filter: { ...params.filter } });
  };

  const {
    data: stakeholderCertificates,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderCertificate[]>({
    queryKey: ['stakeholderCertificates'],
    fetchFunction: fetchStakeholderCertificates
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderCertificate);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (stakeholderCertificate: StakeholderCertificate) => {
    toggleDrawer();
    setSelectedRow(stakeholderCertificate);
  };
  const handleDelete = async (stakeholderCertificateId: string) => {
    await stakeholderCertificateApiService.delete(stakeholderCertificateId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderCertificateDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholderCertificate={selectedRow as StakeholderCertificate}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}
      <ItemsListing
        title={`stakeholder.stakeholder-certificate.title`}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.grid.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <StakeholderCertificateCard stakeholderCertificate={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
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
        items={stakeholderCertificates || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}
export default StakeholderCertificateList;
