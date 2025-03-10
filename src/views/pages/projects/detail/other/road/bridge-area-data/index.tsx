'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiService from 'src/services/project/project-other-service';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { BridgeAreaData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeAreaDataCard from './bridge-area-data-card';
import BridgeAreaDataDrawer from './bridge-area-data-drawer';
import { bridgeAreaDataColumns } from './bridge-area-data-row';
import { useQuery } from '@tanstack/react-query';
import areaTopographyMasterService from 'src/services/general/project/area-topography-master-service';

interface BridgeAreaDataListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const BridgeAreaDataList: React.FC<BridgeAreaDataListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeAreaData | null>(null);
  const { t } = useTranslation();

  // Fetch master data for lookups
  const { data: areaTopographies } = useQuery({
    queryKey: ['masterCategory', 'areaTopographies'],
    queryFn: () => areaTopographyMasterService.getAll({})
  });

  // Create lookup maps
  const areaTopographyMap = new Map();

  if (areaTopographies?.payload) {
    areaTopographies.payload.forEach((type) => {
      areaTopographyMap.set(type.id, type.title);
    });
  }

  const fetchBridgeAreaData = (params: GetRequestParam): Promise<IApiResponse<BridgeAreaData[]>> => {
    return projectOtherApiService<BridgeAreaData>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeAreaData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeAreaData[]>({
    queryKey: ['bridgeAreaData'],
    fetchFunction: fetchBridgeAreaData
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeAreaData: BridgeAreaData) => {
    setSelectedRow(bridgeAreaData);
    setShowDrawer(true);
  };

  const handleDelete = async (bridgeAreaDataId: string) => {
    await projectOtherApiService<BridgeAreaData>().delete(model, bridgeAreaDataId);
    refetch();
  };

  const handleClickDetail = (bridgeAreaData: BridgeAreaData) => {
    setSelectedRow(bridgeAreaData);
    setShowDetailDrawer(true);
  };

  const mapBridgeAreaDataToDetailItems = (bridgeAreaData: BridgeAreaData): { title: string; value: string }[] => [
    { title: t('project.other.bridge-area-data.details.name'), value: bridgeAreaData?.name || 'N/A' },
    { title: t('project.other.bridge-area-data.details.bridge-name'), value: bridgeAreaData?.bridge_name || 'N/A' },
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
      value: areaTopographyMap.get(bridgeAreaData?.area_topography_id) || 'N/A'
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
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeAreaDataDrawer
          model={model}
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
          data={mapBridgeAreaDataToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.bridgeAreaData}
          title={t('project.other.bridge-area-data.bridge-area-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-area-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeAreaDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, areaTopographyMap)
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
        items={bridgeAreaData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeAreaDataList;
