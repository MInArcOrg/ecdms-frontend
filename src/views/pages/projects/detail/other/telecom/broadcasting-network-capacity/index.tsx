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
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { BroadcastingInfrastructure, BroadcastingNetworkCapacity } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BroadcastingNetworkCapacityCard from './broadcasting-network-capacity-card';
import BroadcastingNetworkCapacityDrawer from './broadcasting-network-capacity-drawer';
import { broadcastingNetworkCapacityColumns } from './broadcasting-network-capacity-row';

interface BroadcastingNetworkCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BroadcastingNetworkCapacityList: React.FC<BroadcastingNetworkCapacityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BroadcastingNetworkCapacity | null>(null);
  const { t } = useTranslation();

  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.networkType.model }
      })
  });

  const networkTypeMap = new Map<string, string>(networkTypes?.payload.map((item) => [item.id, item.title || '']) || []);

  const { data: broadcastingInfrastructures } = useQuery({
    queryKey: ['broadcasting-infrastructures', projectId],
    queryFn: () =>
      projectOtherApiSecondService<BroadcastingInfrastructure>().getAll('broadcasting-infrastructures', {
        filter: { project_id: projectId }
      })
  });

  const broadcastingInfrastructureMap = new Map<string, string>(
    broadcastingInfrastructures?.payload.map((item) => [item.id, item.name || '']) || []
  );

  const fetchBroadcastingNetworkCapacities = (params: GetRequestParam): Promise<IApiResponse<BroadcastingNetworkCapacity[]>> => {
    return projectOtherApiSecondService<BroadcastingNetworkCapacity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: broadcastingNetworkCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BroadcastingNetworkCapacity[]>({
    queryKey: ['broadcastingNetworkCapacities'],
    fetchFunction: fetchBroadcastingNetworkCapacities
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BroadcastingNetworkCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BroadcastingNetworkCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => {
    toggleDrawer();
    setSelectedRow(broadcastingNetworkCapacity);
  };

  const handleDelete = async (broadcastingNetworkCapacityId: string) => {
    await projectOtherApiSecondService<BroadcastingNetworkCapacity>().delete(otherSubMenu?.apiRoute || '', broadcastingNetworkCapacityId);
    refetch();
  };

  const handleClickDetail = (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(broadcastingNetworkCapacity);
  };

  const mapBroadcastingNetworkCapacityToDetailItems = (
    broadcastingNetworkCapacity: BroadcastingNetworkCapacity
  ): { title: string; value: string }[] => [
    {
      title: t('project.other.broadcasting-network-capacity.details.broadcasting-infrastructure'),
      value:
        broadcastingNetworkCapacity?.broadcastingInfrastructure?.name ||
        broadcastingInfrastructureMap.get(broadcastingNetworkCapacity?.broadcasting_infrastructure_id) ||
        broadcastingNetworkCapacity?.broadcasting_infrastructure_id ||
        'N/A'
    },
    {
      title: t('project.other.broadcasting-network-capacity.details.network-type'),
      value:
        broadcastingNetworkCapacity?.networkType?.title ||
        networkTypeMap.get(broadcastingNetworkCapacity?.network_type_id) ||
        broadcastingNetworkCapacity?.network_type_id ||
        'N/A'
    },
    {
      title: t('project.other.broadcasting-network-capacity.details.total-bandwidth'),
      value: broadcastingNetworkCapacity?.total_bandwidth?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-capacity.details.users-number'),
      value: broadcastingNetworkCapacity?.users_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.broadcasting-network-capacity.details.remark'),
      value: broadcastingNetworkCapacity?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: broadcastingNetworkCapacity?.created_at ? formatCreatedAt(broadcastingNetworkCapacity.created_at as any) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: broadcastingNetworkCapacity?.updated_at ? formatCreatedAt(broadcastingNetworkCapacity.updated_at as any) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BroadcastingNetworkCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          broadcastingNetworkCapacity={selectedRow as BroadcastingNetworkCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBroadcastingNetworkCapacityToDetailItems(selectedRow as BroadcastingNetworkCapacity)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.broadcasting-network-capacity.broadcasting-network-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.broadcasting-network-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: broadcastingNetworkCapacityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
            broadcastingInfrastructureMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BroadcastingNetworkCapacityCard
            onDetail={handleClickDetail}
            broadcastingNetworkCapacity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
            broadcastingInfrastructureMap={broadcastingInfrastructureMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || 'broadcastingnetworkcapacity'
          }
        }}
        fetchDataFunction={refetch}
        items={broadcastingNetworkCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BroadcastingNetworkCapacityList;
