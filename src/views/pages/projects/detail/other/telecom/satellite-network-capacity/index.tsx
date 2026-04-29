'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetwork, SatelliteNetworkCapacity } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import SatelliteNetworkCapacityCard from './satellite-network-capacity-card';
import SatelliteNetworkCapacityDrawer from './satellite-network-capacity-drawer';
import { satelliteNetworkCapacityColumns } from './satellite-network-capacity-row';

interface SatelliteNetworkCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const SatelliteNetworkCapacityList: React.FC<SatelliteNetworkCapacityListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<SatelliteNetworkCapacity | null>(null);
  const { t } = useTranslation();

  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const { data: satelliteNetworks } = useQuery({
    queryKey: ['satellite-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<SatelliteNetwork>().getAll('satellite-networks', {
        filter: { project_id: projectId }
      })
  });

  const networkTypeMap = new Map(networkTypes?.payload.map((item) => [item.id, item.title || '']) || []);
  const satelliteNetworkMap = new Map(satelliteNetworks?.payload.map((item) => [item.id, item.name || 'N/A']) || []);

  const fetchSatelliteNetworkCapacities = (params: GetRequestParam): Promise<IApiResponse<SatelliteNetworkCapacity[]>> => {
    return projectOtherApiSecondService<SatelliteNetworkCapacity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: satelliteNetworkCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SatelliteNetworkCapacity[]>({
    queryKey: ['satelliteNetworkCapacities'],
    fetchFunction: fetchSatelliteNetworkCapacities
  });

  const toggleDrawer = () => {
    setSelectedRow({} as SatelliteNetworkCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as SatelliteNetworkCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (satelliteNetworkCapacity: SatelliteNetworkCapacity) => {
    toggleDrawer();
    setSelectedRow(satelliteNetworkCapacity);
  };

  const handleDelete = async (satelliteNetworkCapacityId: string) => {
    await projectOtherApiSecondService<SatelliteNetworkCapacity>().delete(otherSubMenu?.apiRoute || '', satelliteNetworkCapacityId);
    refetch();
  };

  const handleClickDetail = (satelliteNetworkCapacity: SatelliteNetworkCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(satelliteNetworkCapacity);
  };

  const mapSatelliteNetworkCapacityToDetailItems = (satelliteNetworkCapacity: SatelliteNetworkCapacity): { title: string; value: string }[] => [
    {
      title: t('project.other.satellite-network.title'),
      value: satelliteNetworkMap.get(satelliteNetworkCapacity?.satellite_network_id) || 'N/A'
    },
    {
      title: t('project.other.satellite-network-capacity.details.network-type-id'),
      value: networkTypeMap.get(satelliteNetworkCapacity?.network_type_id) || satelliteNetworkCapacity?.network_type_id || 'N/A'
    },
    {
      title: t('project.other.satellite-network-capacity.details.total-bandwidth'),
      value: satelliteNetworkCapacity?.total_bandwidth?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-capacity.details.users-number'),
      value: satelliteNetworkCapacity?.users_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.satellite-network-capacity.details.remark'),
      value: satelliteNetworkCapacity?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: satelliteNetworkCapacity?.created_at ? formatCreatedAt(satelliteNetworkCapacity.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: satelliteNetworkCapacity?.updated_at ? formatCreatedAt(satelliteNetworkCapacity.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <SatelliteNetworkCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          satelliteNetworkCapacity={selectedRow as SatelliteNetworkCapacity}
          refetch={refetch}
          projectId={projectId}
          satelliteNetworks={satelliteNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSatelliteNetworkCapacityToDetailItems(selectedRow as SatelliteNetworkCapacity)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.satelliteNetworkCapacity}
          title={t('project.other.satellite-network-capacity.satellite-network-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.satellite-network-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: satelliteNetworkCapacityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
            satelliteNetworkMap,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <SatelliteNetworkCapacityCard
            onDetail={handleClickDetail}
            satelliteNetworkCapacity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
            satelliteNetworkMap={satelliteNetworkMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || ''
          }
        }}
        fetchDataFunction={refetch}
        items={satelliteNetworkCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default SatelliteNetworkCapacityList;
