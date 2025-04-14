'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderMachineryApiService from 'src/services/stakeholder/stakeholder-machinery-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import MachineryCard from './stakeholder-machinery-card';
import MachineryDrawer from './stakeholder-machinery-drawe';
import type { StakeholderMachinery } from 'src/types/stakeholder/stakeholder-machinery';
import { machineryColumns } from './stakeholder-machinery-row';

interface StakeholderMachineryListProps {
  stakeholderId: string;
}

const StakeholderMachineryList: React.FC<StakeholderMachineryListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderMachinery | null>(null);
  const { t } = useTranslation();

  const fetchMachineries = (params: GetRequestParam): Promise<IApiResponse<StakeholderMachinery[]>> => {
    return stakeholderMachineryApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: machineries,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderMachinery[]>({
    queryKey: ['machineries'],
    fetchFunction: fetchMachineries
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderMachinery);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderMachinery);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (machinery: StakeholderMachinery) => {
    toggleDrawer();
    setSelectedRow(machinery);
  };

  const handleDelete = async (machineryId: string) => {
    await stakeholderMachineryApiService.delete(machineryId);
    refetch();
  };

  const handleClickDetail = (machinery: StakeholderMachinery) => {
    toggleDetailDrawer();
    setSelectedRow(machinery);
  };

  const mapMachineryToDetailItems = (machinery: StakeholderMachinery): { title: string; value: string }[] => [
    { title: t('stakeholder.machinery.name'), value: machinery?.name || 'N/A' },
    { title: t('stakeholder.machinery.plate-no'), value: machinery?.plate_no || 'N/A' },
    { title: t('stakeholder.machinery.brand-name'), value: machinery?.brand_name || 'N/A' },
    { title: t('stakeholder.machinery.model'), value: machinery?.model || 'N/A' },
    { title: t('stakeholder.machinery.year'), value: machinery?.year?.toString() || 'N/A' },
    { title: t('stakeholder.machinery.chassis-number'), value: machinery?.chassis_number || 'N/A' },
    { title: t('stakeholder.machinery.engine-number'), value: machinery?.engine_number || 'N/A' },
    { title: t('stakeholder.machinery.capacity'), value: machinery?.capacity || 'N/A' },
    { title: t('stakeholder.machinery.purpose'), value: machinery?.purpose || 'N/A' },
    { title: t('stakeholder.machinery.quantity'), value: machinery?.quantity?.toString() || 'N/A' },
    { title: t('stakeholder.machinery.current-situation'), value: machinery?.current_situation || 'N/A' },
    { title: t('stakeholder.machinery.location'), value: machinery?.location || 'N/A' },
    {
      title: t('common.table-columns.created-at'),
      value: machinery?.created_at ? formatCreatedAt(machinery.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MachineryDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          machinery={selectedRow as StakeholderMachinery}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMachineryToDetailItems(selectedRow as StakeholderMachinery)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="stakeholder-machinery"
          title={t('stakeholder.machinery.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.machinery.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: machineryColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MachineryCard onDetail={handleClickDetail} machinery={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'stakeholdermachinery'
          }
        }}
        fetchDataFunction={refetch}
        items={machineries || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderMachineryList;
