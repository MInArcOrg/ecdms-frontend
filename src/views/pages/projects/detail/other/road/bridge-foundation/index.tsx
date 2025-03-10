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
import type { BridgeFoundation } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeFoundationCard from './bridge-foundation-card';
import BridgeFoundationDrawer from './bridge-foundation-drawer';
import { bridgeFoundationColumns } from './bridge-foundation-row';
import { useQuery } from '@tanstack/react-query';
import abutmentTypeMasterService from 'src/services/general/project/abutment-type-master-service';
import pierTypeMasterService from 'src/services/general/project/pier-type-master-service';
import soilTypeMasterService from 'src/services/general/project/soil-type-master-service';

interface BridgeFoundationListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const BridgeFoundationList: React.FC<BridgeFoundationListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeFoundation | null>(null);
  const { t } = useTranslation();

  // Fetch master data for lookups
  const { data: abutmentTypes } = useQuery({
    queryKey: ['masterCategory', 'abutmentTypes'],
    queryFn: () => abutmentTypeMasterService.getAll({})
  });

  const { data: pierTypes } = useQuery({
    queryKey: ['masterCategory', 'pierTypes'],
    queryFn: () => pierTypeMasterService.getAll({})
  });

  const { data: soilTypes } = useQuery({
    queryKey: ['masterCategory', 'soilTypes'],
    queryFn: () => soilTypeMasterService.getAll({})
  });

  // Create lookup maps
  const abutmentTypeMap = new Map();
  const pierTypeMap = new Map();
  const soilTypeMap = new Map();

  if (abutmentTypes?.payload) {
    abutmentTypes.payload.forEach((type) => {
      abutmentTypeMap.set(type.id, type.title);
    });
  }

  if (pierTypes?.payload) {
    pierTypes.payload.forEach((type) => {
      pierTypeMap.set(type.id, type.title);
    });
  }

  if (soilTypes?.payload) {
    soilTypes.payload.forEach((type) => {
      soilTypeMap.set(type.id, type.title);
    });
  }

  const fetchBridgeFoundations = (params: GetRequestParam): Promise<IApiResponse<BridgeFoundation[]>> => {
    return projectOtherApiService<BridgeFoundation>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeFoundations,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeFoundation[]>({
    queryKey: ['bridgeFoundations'],
    fetchFunction: fetchBridgeFoundations
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeFoundation: BridgeFoundation) => {
    setSelectedRow(bridgeFoundation);
    setShowDrawer(true);
  };

  const handleDelete = async (bridgeFoundationId: string) => {
    await projectOtherApiService<BridgeFoundation>().delete(model, bridgeFoundationId);
    refetch();
  };

  const handleClickDetail = (bridgeFoundation: BridgeFoundation) => {
    setSelectedRow(bridgeFoundation);
    setShowDetailDrawer(true);
  };

  const mapBridgeFoundationToDetailItems = (
    bridgeFoundation: BridgeFoundation
  ): { title: string; value: string }[] => [
    { title: t('project.other.bridge-foundation.details.name'), value: bridgeFoundation?.name || 'N/A' },
    {
      title: t('project.other.bridge-foundation.details.bridge-name'),
      value: bridgeFoundation?.bridge_name || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.abutment-type-id'),
      value: abutmentTypeMap.get(bridgeFoundation?.abutment_type_id) || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.pier-type-id'),
      value: pierTypeMap.get(bridgeFoundation?.pier_type_id) || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.abutment-foundation-size'),
      value: bridgeFoundation?.abutment_foundation_size?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.pier-foundation-size'),
      value: bridgeFoundation?.pier_foundation_size?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.abutment-pile-number'),
      value: bridgeFoundation?.abutment_pile_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.pier-pile-number'),
      value: bridgeFoundation?.pier_pile_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.abutment-pile-depth'),
      value: bridgeFoundation?.abutment_pile_depth?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.pier-pile-depth'),
      value: bridgeFoundation?.pier_pile_depth?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-foundation.details.soil-type-id'),
      value: soilTypeMap.get(bridgeFoundation?.soil_type_id) || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeFoundation?.created_at ? formatCreatedAt(bridgeFoundation.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeFoundationDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeFoundation={selectedRow as BridgeFoundation}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeFoundationToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.bridgeFoundation}
          title={t('project.other.bridge-foundation.bridge-foundation-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-foundation.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeFoundationColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            abutmentTypeMap,
            pierTypeMap,
            soilTypeMap
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeFoundationCard
            onDetail={handleClickDetail}
            bridgeFoundation={data}
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
            subject: 'bridgefoundation'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeFoundations || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeFoundationList;
