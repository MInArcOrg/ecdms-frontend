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
import type { MobileNetworkCapacity, MobileNetwork } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import MobileNetworkCapacityCard from './mobile-network-capacity-card';
import MobileNetworkCapacityDrawer from './mobile-network-capacity-drawer';
import { mobileNetworkCapacityColumns } from './mobile-network-capacity-row';
import { useQuery } from '@tanstack/react-query';
import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import projectGeneralMasterDataApiService from 'src/services/general/project-general-master-data-service';

interface MobileNetworkCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MobileNetworkCapacityList: React.FC<MobileNetworkCapacityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<MobileNetworkCapacity | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: networkTypes } = useQuery({
    queryKey: ['network-types'],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model }
      })
  });

  const { data: mobileNetworks } = useQuery({
    queryKey: ['mobile-networks', projectId],
    queryFn: () =>
      projectOtherApiSecondService<MobileNetwork>().getAll('mobile-networks', {
        filter: { project_id: projectId }
      })
  });

  // Create maps for quick lookup
  const networkTypeMap = new Map(networkTypes?.payload.map((item) => [item.id, item.title || '']) || []);
  const mobileNetworkMap = new Map(
    mobileNetworks?.payload.map((item) => [
      item.id,
      item.name || 'N/A'
    ]) || []
  );

  const fetchMobileNetworkCapacities = (params: GetRequestParam): Promise<IApiResponse<MobileNetworkCapacity[]>> => {
    return projectOtherApiSecondService<MobileNetworkCapacity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: mobileNetworkCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MobileNetworkCapacity[]>({
    queryKey: ['mobileNetworkCapacities'],
    fetchFunction: fetchMobileNetworkCapacities
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MobileNetworkCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MobileNetworkCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (mobileNetworkCapacity: MobileNetworkCapacity) => {
    toggleDrawer();
    setSelectedRow(mobileNetworkCapacity);
  };

  const handleDelete = async (mobileNetworkCapacityId: string) => {
    await projectOtherApiSecondService<MobileNetworkCapacity>().delete(otherSubMenu?.apiRoute || '', mobileNetworkCapacityId);
    refetch();
  };

  const handleClickDetail = (mobileNetworkCapacity: MobileNetworkCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(mobileNetworkCapacity);
  };

  const mapMobileNetworkCapacityToDetailItems = (mobileNetworkCapacity: MobileNetworkCapacity): { title: string; value: string }[] => [
    {
      title: t('project.other.network-capacity.details.network-type'),
      value: networkTypeMap.get(mobileNetworkCapacity?.network_type_id) || mobileNetworkCapacity?.network_type_id || 'N/A'
    },
    {
      title: t('project.other.mobile-network.title'),
      value: mobileNetworkMap.get(mobileNetworkCapacity?.mobile_network_id) || 'N/A'
    },
    {
      title: t('project.other.network-capacity.details.total-bandwidth'),
      value: mobileNetworkCapacity?.total_bandwidth?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-capacity.details.users-number'),
      value: mobileNetworkCapacity?.users_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.network-capacity.details.remark'),
      value: mobileNetworkCapacity?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: mobileNetworkCapacity?.created_at ? formatCreatedAt(mobileNetworkCapacity.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: mobileNetworkCapacity?.updated_at ? formatCreatedAt(mobileNetworkCapacity.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <MobileNetworkCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          mobileNetworkCapacity={selectedRow as MobileNetworkCapacity}
          refetch={refetch}
          projectId={projectId}
          mobileNetworks={mobileNetworks?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMobileNetworkCapacityToDetailItems(selectedRow as MobileNetworkCapacity)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.networkCapacity}
          title={t('project.other.network-capacity.network-capacity-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.network-capacity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: mobileNetworkCapacityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
            mobileNetworkMap,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MobileNetworkCapacityCard
            onDetail={handleClickDetail}
            mobileNetworkCapacity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
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
        items={mobileNetworkCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MobileNetworkCapacityList;
