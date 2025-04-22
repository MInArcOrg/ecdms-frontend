'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { TransmissionLineEquipmentData, TransmissionLineInformation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TransmissionLineEquipmentDataCard from './transmission-line-equipment-data-card';
import TransmissionLineEquipmentDataDrawer from './transmission-line-equipment-data-drawer';
import { transmissionLineEquipmentDataColumns } from './transmission-line-equipment-data-row';

interface TransmissionLineEquipmentDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TransmissionLineEquipmentDataList: React.FC<TransmissionLineEquipmentDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransmissionLineEquipmentData | null>(null);
  const { t } = useTranslation();

  const { data: transmissionLines } = useQuery({
    queryKey: ['transmission-line-informations', projectId],
    queryFn: () =>
      projectOtherApiSecondService<TransmissionLineInformation>().getAll('transmission-line-informations', {
        filter: { project_id: projectId }
      })
  });

  const fetchTransmissionLineEquipmentDatas = (params: GetRequestParam): Promise<IApiResponse<TransmissionLineEquipmentData[]>> => {
    return projectOtherApiSecondService<TransmissionLineEquipmentData>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: transmissionLineEquipmentDatas,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TransmissionLineEquipmentData[]>({
    queryKey: ['transmissionLineEquipmentDatas'],
    fetchFunction: fetchTransmissionLineEquipmentDatas
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TransmissionLineEquipmentData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TransmissionLineEquipmentData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transmissionLineEquipmentData: TransmissionLineEquipmentData) => {
    toggleDrawer();
    setSelectedRow(transmissionLineEquipmentData);
  };

  const handleDelete = async (transmissionLineEquipmentDataId: string) => {
    await projectOtherApiSecondService<TransmissionLineEquipmentData>().delete(
      otherSubMenu?.apiRoute || '',
      transmissionLineEquipmentDataId
    );
    refetch();
  };

  const handleClickDetail = (transmissionLineEquipmentData: TransmissionLineEquipmentData) => {
    toggleDetailDrawer();
    setSelectedRow(transmissionLineEquipmentData);
  };

  const mapTransmissionLineEquipmentDataToDetailItems = (
    transmissionLineEquipmentData: TransmissionLineEquipmentData
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.transmission-line-equipment-data.details.name'),
      value: transmissionLineEquipmentData?.name || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.transmission-line-id'),
      value: transmissionLineEquipmentData?.transmission_line_id || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.insulator-type'),
      value: transmissionLineEquipmentData?.insulator_type || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.ground-wire-type'),
      value: transmissionLineEquipmentData?.ground_wire_type || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.fiber-optics-number'),
      value:
        transmissionLineEquipmentData?.fiber_optics_number !== undefined
          ? transmissionLineEquipmentData.fiber_optics_number.toString()
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.opgw-uts'),
      value: transmissionLineEquipmentData?.opgw_uts !== undefined ? transmissionLineEquipmentData.opgw_uts.toString() : 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.opgw-weight'),
      value: transmissionLineEquipmentData?.opgw_weight !== undefined ? transmissionLineEquipmentData.opgw_weight.toString() : 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.owner-operator'),
      value: transmissionLineEquipmentData?.owner_operator || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.tower-grounding'),
      value: transmissionLineEquipmentData?.tower_grounding || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.tower-circuit-arrangement'),
      value: transmissionLineEquipmentData?.tower_circuit_arrangement || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.other-equipment'),
      value: transmissionLineEquipmentData?.other_equipment || 'N/A'
    },
    {
      title: t('project.other.transmission-line-equipment-data.details.remark'),
      value: transmissionLineEquipmentData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: transmissionLineEquipmentData?.created_at ? formatCreatedAt(transmissionLineEquipmentData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: transmissionLineEquipmentData?.updated_at ? formatCreatedAt(transmissionLineEquipmentData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <TransmissionLineEquipmentDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          transmissionLineEquipmentData={selectedRow as TransmissionLineEquipmentData}
          refetch={refetch}
          projectId={projectId}
          transmissionLines={transmissionLines?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransmissionLineEquipmentDataToDetailItems(selectedRow as TransmissionLineEquipmentData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transmissionLineEquipmentData}
          title={t('project.other.transmission-line-equipment-data.transmission-line-equipment-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transmission-line-equipment-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transmissionLineEquipmentDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransmissionLineEquipmentDataCard
            onDetail={handleClickDetail}
            transmissionLineEquipmentData={data}
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
            subject: 'transmissionlineequipmentdata'
          }
        }}
        fetchDataFunction={refetch}
        items={transmissionLineEquipmentDatas || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransmissionLineEquipmentDataList;
