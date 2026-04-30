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
import type { BroadcastingInfrastructureManufacturer, BroadcastingInfrastructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import { useQuery } from '@tanstack/react-query';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BroadcastingInfrastructureManufacturerCard from './broadcasting-infrastructure-manufacturer-card';
import BroadcastingInfrastructureManufacturerDrawer from './broadcasting-infrastructure-manufacturer-drawer';
import { broadcastingInfrastructureManufacturerColumns } from './broadcasting-infrastructure-manufacturer-row';

interface BroadcastingInfrastructureManufacturerListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BroadcastingInfrastructureManufacturerList: React.FC<BroadcastingInfrastructureManufacturerListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BroadcastingInfrastructureManufacturer | null>(null);
  const { t } = useTranslation();

  const { data: broadcastingInfrastructures } = useQuery({
    queryKey: ['broadcasting-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<BroadcastingInfrastructure>().getAll('broadcasting-infrastructures', {
        filter: { project_id: projectId }
      })
  });

  const fetchBroadcastingInfrastructureManufacturers = (
    params: GetRequestParam
  ): Promise<IApiResponse<BroadcastingInfrastructureManufacturer[]>> => {
    return projectOtherApiSecondService<BroadcastingInfrastructureManufacturer>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: broadcastingInfrastructureManufacturers,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BroadcastingInfrastructureManufacturer[]>({
    queryKey: ['broadcastingInfrastructureManufacturers'],
    fetchFunction: fetchBroadcastingInfrastructureManufacturers
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructureManufacturer);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BroadcastingInfrastructureManufacturer);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => {
    toggleDrawer();
    setSelectedRow(broadcastingInfrastructureManufacturer);
  };

  const handleDelete = async (broadcastingInfrastructureManufacturerId: string) => {
    await projectOtherApiSecondService<BroadcastingInfrastructureManufacturer>().delete(
      otherSubMenu?.apiRoute || '',
      broadcastingInfrastructureManufacturerId
    );
    refetch();
  };

  const handleClickDetail = (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => {
    toggleDetailDrawer();
    setSelectedRow(broadcastingInfrastructureManufacturer);
  };
  
  const mapBroadcastingInfrastructureManufacturerToDetailItems = (
    broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.name'),
      value: broadcastingInfrastructureManufacturer?.name || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.broadcasting-infrastructure'),
      value: broadcastingInfrastructureManufacturer?.broadcastingInfrastructure?.name || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.antennas'),
      value: broadcastingInfrastructureManufacturer?.antennas || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.transmitters'),
      value: broadcastingInfrastructureManufacturer?.transmitters || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.towers'),
      value: broadcastingInfrastructureManufacturer?.towers || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.cables'),
      value: broadcastingInfrastructureManufacturer?.cables || 'N/A'
    },
    {
      title: t('project.other.broadcasting-infrastructure-manufacturer.details.others'),
      value: broadcastingInfrastructureManufacturer?.others || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: broadcastingInfrastructureManufacturer?.created_at ? formatCreatedAt(broadcastingInfrastructureManufacturer.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: broadcastingInfrastructureManufacturer?.updated_at ? formatCreatedAt(broadcastingInfrastructureManufacturer.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BroadcastingInfrastructureManufacturerDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          broadcastingInfrastructureManufacturer={selectedRow as BroadcastingInfrastructureManufacturer}
          refetch={refetch}
          projectId={projectId}
          broadcastingInfrastructures={broadcastingInfrastructures?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBroadcastingInfrastructureManufacturerToDetailItems(selectedRow as BroadcastingInfrastructureManufacturer)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.broadcastingInfrastructureManufacturer}
          title={t('project.other.broadcasting-infrastructure-manufacturer.broadcasting-infrastructure-manufacturer-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.broadcasting-infrastructure-manufacturer.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: broadcastingInfrastructureManufacturerColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BroadcastingInfrastructureManufacturerCard
            onDetail={handleClickDetail}
            broadcastingInfrastructureManufacturer={data}
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
            subject: 'broadcastinginfrastructuremanufacturer'
          }
        }}
        fetchDataFunction={refetch}
        items={broadcastingInfrastructureManufacturers || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BroadcastingInfrastructureManufacturerList;
