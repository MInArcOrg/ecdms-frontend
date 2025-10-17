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
import type { TransmissionLineConductorAndTowerData, TransmissionLine } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import TransmissionLineConductorAndTowerDataCard from './transmission-line-conductor-and-tower-data-card';
import TransmissionLineConductorAndTowerDataDrawer from './transmission-line-conductor-and-tower-data-drawer';
import { transmissionLineConductorAndTowerDataColumns } from './transmission-line-conductor-and-tower-data-row';

interface TransmissionLineConductorAndTowerDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TransmissionLineConductorAndTowerDataList: React.FC<TransmissionLineConductorAndTowerDataListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TransmissionLineConductorAndTowerData | null>(null);
  const { t } = useTranslation();

  const { data: transmissionLines } = useQuery({
    queryKey: ['transmission-line-informations', projectId],
    queryFn: () =>
      projectOtherApiSecondService<TransmissionLine>().getAll('transmission-line-informations', {
        filter: { project_id: projectId }
      })
  });

  const fetchTransmissionLineConductorAndTowerDatas = (
    params: GetRequestParam
  ): Promise<IApiResponse<TransmissionLineConductorAndTowerData[]>> => {
    return projectOtherApiSecondService<TransmissionLineConductorAndTowerData>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: transmissionLineConductorAndTowerDatas,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<TransmissionLineConductorAndTowerData[]>({
    queryKey: ['transmissionLineConductorAndTowerDatas'],
    fetchFunction: fetchTransmissionLineConductorAndTowerDatas
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TransmissionLineConductorAndTowerData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TransmissionLineConductorAndTowerData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData) => {
    toggleDrawer();
    setSelectedRow(transmissionLineConductorAndTowerData);
  };

  const handleDelete = async (transmissionLineConductorAndTowerDataId: string) => {
    await projectOtherApiSecondService<TransmissionLineConductorAndTowerData>().delete(
      otherSubMenu?.apiRoute || '',
      transmissionLineConductorAndTowerDataId
    );
    refetch();
  };

  const handleClickDetail = (transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData) => {
    toggleDetailDrawer();
    setSelectedRow(transmissionLineConductorAndTowerData);
  };

  const mapTransmissionLineConductorAndTowerDataToDetailItems = (
    transmissionLineConductorAndTowerData: TransmissionLineConductorAndTowerData
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.name'),
      value: transmissionLineConductorAndTowerData?.name || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.transmission-line-id'),
      value: transmissionLineConductorAndTowerData?.transmission_line_id || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.conductor-type'),
      value: transmissionLineConductorAndTowerData?.conductor_type || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.conductor-code-name-id'),
      value: transmissionLineConductorAndTowerData?.conductor_code_name_id || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.strands-number'),
      value:
        transmissionLineConductorAndTowerData?.strands_number !== undefined
          ? transmissionLineConductorAndTowerData.strands_number.toString()
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.conductor-size'),
      value:
        transmissionLineConductorAndTowerData?.conductor_size !== undefined
          ? `${transmissionLineConductorAndTowerData.conductor_size} ${t('common.mm2')}`
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.conductors-per-phase-number'),
      value:
        transmissionLineConductorAndTowerData?.conductors_per_phase_number !== undefined
          ? transmissionLineConductorAndTowerData.conductors_per_phase_number.toString()
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.tower-type-id'),
      value: transmissionLineConductorAndTowerData?.tower_type_id || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.tower-height'),
      value:
        transmissionLineConductorAndTowerData?.tower_height !== undefined
          ? `${transmissionLineConductorAndTowerData.tower_height} ${t('common.meters')}`
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.conductor-diameter'),
      value:
        transmissionLineConductorAndTowerData?.conductor_diameter !== undefined
          ? `${transmissionLineConductorAndTowerData.conductor_diameter} ${t('common.mm')}`
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.each-strand-diameter'),
      value:
        transmissionLineConductorAndTowerData?.each_strand_diameter !== undefined
          ? `${transmissionLineConductorAndTowerData.each_strand_diameter} ${t('common.mm')}`
          : 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.tower-foundation-type-id'),
      value: transmissionLineConductorAndTowerData?.tower_foundation_type_id || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.other-equipment'),
      value: transmissionLineConductorAndTowerData?.other_equipment || 'N/A'
    },
    {
      title: t('project.other.transmission-line-conductor-and-tower-data.details.remark'),
      value: transmissionLineConductorAndTowerData?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: transmissionLineConductorAndTowerData?.created_at ? formatCreatedAt(transmissionLineConductorAndTowerData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: transmissionLineConductorAndTowerData?.updated_at ? formatCreatedAt(transmissionLineConductorAndTowerData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <TransmissionLineConductorAndTowerDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          transmissionLineConductorAndTowerData={selectedRow as TransmissionLineConductorAndTowerData}
          refetch={refetch}
          projectId={projectId}
          transmissionLines={transmissionLines?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTransmissionLineConductorAndTowerDataToDetailItems(selectedRow as TransmissionLineConductorAndTowerData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.transmissionLineConductorAndTowerData}
          title={t('project.other.transmission-line-conductor-and-tower-data.transmission-line-conductor-and-tower-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.transmission-line-conductor-and-tower-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: transmissionLineConductorAndTowerDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TransmissionLineConductorAndTowerDataCard
            onDetail={handleClickDetail}
            transmissionLineConductorAndTowerData={data}
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
            subject: 'transmissionlineconductorandtowerdata'
          }
        }}
        fetchDataFunction={refetch}
        items={transmissionLineConductorAndTowerDatas || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TransmissionLineConductorAndTowerDataList;
