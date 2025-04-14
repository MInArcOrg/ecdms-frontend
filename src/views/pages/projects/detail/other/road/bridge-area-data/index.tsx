'use client';

import type React from 'react';

import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { BridgeAreaData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeAreaDataCard from './bridge-area-data-card';
import BridgeAreaDataDrawer from './bridge-area-data-drawer';
import { bridgeAreaDataColumns } from './bridge-area-data-row';

interface BridgeAreaDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeAreaDataList: React.FC<BridgeAreaDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeAreaData | null>(null);
  const { t } = useTranslation();

  const fetchBridgeAreaData = (params: GetRequestParam): Promise<IApiResponse<BridgeAreaData[]>> => {
    return projectOtherApiSecondService<BridgeAreaData>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeAreaDataList,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeAreaData[]>({
    queryKey: ['bridgeAreaData'],
    fetchFunction: fetchBridgeAreaData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeAreaData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeAreaData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeAreaData: BridgeAreaData) => {
    toggleDrawer();
    setSelectedRow(bridgeAreaData);
  };

  const handleDelete = async (bridgeAreaDataId: string) => {
    await projectOtherApiSecondService<BridgeAreaData>().delete(otherSubMenu?.apiRoute || '', bridgeAreaDataId);
    refetch();
  };

  const handleClickDetail = (bridgeAreaData: BridgeAreaData) => {
    toggleDetailDrawer();
    setSelectedRow(bridgeAreaData);
  };

  const mapBridgeAreaDataToDetailItems = (bridgeAreaData: BridgeAreaData): { title: string; value: string }[] => [
    {
      title: t('project.other.bridge-area-data.details.name'),
      value: bridgeAreaData?.name || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.bridge-name'),
      value: bridgeAreaData?.bridge_name || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.river-width'),
      value: bridgeAreaData?.river_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.highest-water-level'),
      value: bridgeAreaData?.highest_water_level?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.lowest-water-level'),
      value: bridgeAreaData?.lowest_water_level?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.area-topography-id'),
      value: bridgeAreaData?.area_topography_id || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.detour-possibility'),
      value: bridgeAreaData?.detour_possibility ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.bridge-area-data.details.road-alignment'),
      value: bridgeAreaData?.road_alignment || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.altitude'),
      value: bridgeAreaData?.altitude?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-area-data.details.load-limit-sign'),
      value: bridgeAreaData?.load_limit_sign ? t('common.yes') : t('common.no')
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeAreaData?.created_at ? formatCreatedAt(bridgeAreaData.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: bridgeAreaData?.updated_at ? formatCreatedAt(bridgeAreaData.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeAreaDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeAreaData={selectedRow as BridgeAreaData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeAreaDataToDetailItems(selectedRow as BridgeAreaData)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.bridge-area-data.bridge-area-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-area-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeAreaDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeAreaDataCard
            onDetail={handleClickDetail}
            bridgeAreaData={data}
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
            subject: 'bridgeareadata'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeAreaDataList || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeAreaDataList;
