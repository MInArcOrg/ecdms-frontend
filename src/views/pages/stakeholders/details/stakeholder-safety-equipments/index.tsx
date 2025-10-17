'use client';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import safetyEquipmentApiService from 'src/services/stakeholder/safety-equipment-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import SafetyEquipmentCard from './safety-equipment-card';
import SafetyEquipmentDrawer from './safety-equipment-drawer';
import type { SafetyEquipment } from 'src/types/stakeholder/stakeholder-safety-equipment';
import { safetyEquipmentColumns } from './safety-equipment-row';

interface SafetyEquipmentListProps {
  stakeholderId: string;
}

const SafetyEquipmentList: React.FC<SafetyEquipmentListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SafetyEquipment | null>(null);
  const { t } = useTranslation();

  const fetchSafetyEquipments = (params: GetRequestParam): Promise<IApiResponse<SafetyEquipment[]>> => {
    return safetyEquipmentApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: safetyEquipments,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SafetyEquipment[]>({
    queryKey: ['safetyEquipments'],
    fetchFunction: fetchSafetyEquipments
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SafetyEquipment);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SafetyEquipment);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (equipment: SafetyEquipment) => {
    toggleDrawer();
    setSelectedRow(equipment);
  };

  const handleDelete = async (equipmentId: string) => {
    await safetyEquipmentApiService.delete(equipmentId);
    refetch();
  };

  const handleClickDetail = (equipment: SafetyEquipment) => {
    toggleDetailDrawer();
    setSelectedRow(equipment);
  };

  const mapSafetyEquipmentToDetailItems = (equipment: SafetyEquipment): { title: string; value: string }[] => [
    {
      title: t('stakeholder.safety-equipment.name'),
      value: equipment?.name || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.serial-no'),
      value: equipment?.serial_no || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.brand-name'),
      value: equipment?.brand_name || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.model'),
      value: equipment?.model || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.year'),
      value: equipment?.year?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.capacity'),
      value: equipment?.capacity || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.purpose'),
      value: equipment?.purpose || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.quantity'),
      value: equipment?.quantity?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.current-situation'),
      value: equipment?.current_situation || 'N/A'
    },
    {
      title: t('stakeholder.safety-equipment.location'),
      value: equipment?.location || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: equipment?.created_at ? formatCreatedAt(equipment.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <SafetyEquipmentDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          equipment={selectedRow as SafetyEquipment}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyEquipmentToDetailItems(selectedRow as SafetyEquipment)}
          id={selectedRow?.id || ''}
          hasReference={false}
          fileType="safety-equipment"
          title={t('stakeholder.safety-equipment.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.safety-equipment.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: safetyEquipmentColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SafetyEquipmentCard
            onDetail={handleClickDetail}
            equipment={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'safetyequipment'
          }
        }}
        fetchDataFunction={refetch}
        items={safetyEquipments || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SafetyEquipmentList;
