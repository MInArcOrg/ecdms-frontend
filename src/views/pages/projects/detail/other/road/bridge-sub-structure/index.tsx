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
import type { BridgeSubStructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeSubStructureCard from './bridge-sub-structure-card';
import BridgeSubStructureDrawer from './bridge-sub-structure-drawer';
import { bridgeSubStructureColumns } from './bridge-sub-structure-row';
import { useQuery } from '@tanstack/react-query';
import pierTypeMasterService from 'src/services/general/project/pier-type-master-service';

interface BridgeSubStructureListProps {
  model: string;
  typeId: string;
  projectId: string;
}

const BridgeSubStructureList: React.FC<BridgeSubStructureListProps> = ({ model, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeSubStructure | null>(null);
  const { t } = useTranslation();

  // Fetch master data for lookups
  const { data: pierTypes } = useQuery({
    queryKey: ['masterCategory', 'pierTypes'],
    queryFn: () => pierTypeMasterService.getAll({})
  });

  // Create lookup maps
  const pierTypeMap = new Map();

  if (pierTypes?.payload) {
    pierTypes.payload.forEach((type) => {
      pierTypeMap.set(type.id, type.title);
    });
  }

  const fetchBridgeSubStructures = (params: GetRequestParam): Promise<IApiResponse<BridgeSubStructure[]>> => {
    return projectOtherApiService<BridgeSubStructure>().getAll(model, {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeSubStructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeSubStructure[]>({
    queryKey: ['bridgeSubStructures'],
    fetchFunction: fetchBridgeSubStructures
  });

  const toggleDrawer = () => {
    setSelectedRow(null);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow(null);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeSubStructure: BridgeSubStructure) => {
    setSelectedRow(bridgeSubStructure);
    setShowDrawer(true);
  };

  const handleDelete = async (bridgeSubStructureId: string) => {
    await projectOtherApiService<BridgeSubStructure>().delete(model, bridgeSubStructureId);
    refetch();
  };

  const handleClickDetail = (bridgeSubStructure: BridgeSubStructure) => {
    setSelectedRow(bridgeSubStructure);
    setShowDetailDrawer(true);
  };

  const mapBridgeSubStructureToDetailItems = (
    bridgeSubStructure: BridgeSubStructure
  ): { title: string; value: string }[] => [
    { title: t('project.other.bridge-sub-structure.details.name'), value: bridgeSubStructure?.name || 'N/A' },
    {
      title: t('project.other.bridge-sub-structure.details.bridge-name'),
      value: bridgeSubStructure?.bridge_name || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.abutment-a1-height'),
      value: bridgeSubStructure?.abutment_a1_height?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.abutment-a1-width'),
      value: bridgeSubStructure?.abutment_a1_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.abutment-a2-height'),
      value: bridgeSubStructure?.abutment_a2_height?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.abutment-a2-width'),
      value: bridgeSubStructure?.abutment_a2_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.wing-wall-length'),
      value: bridgeSubStructure?.wing_wall_length?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.pier-type-id'),
      value: pierTypeMap.get(bridgeSubStructure?.pier_type_id) || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.piers-number'),
      value: bridgeSubStructure?.piers_number?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.piers-dimension'),
      value: bridgeSubStructure?.piers_dimension || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.pier1-height'),
      value: bridgeSubStructure?.pier1_height?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.pier1-width'),
      value: bridgeSubStructure?.pier1_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.pier2-height'),
      value: bridgeSubStructure?.pier2_height?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-sub-structure.details.pier2-width'),
      value: bridgeSubStructure?.pier2_width?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeSubStructure?.created_at ? formatCreatedAt(bridgeSubStructure.created_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeSubStructureDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeSubStructure={selectedRow as BridgeSubStructure}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeSubStructureToDetailItems(selectedRow!)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.bridgeSubStructure}
          title={t('project.other.bridge-sub-structure.bridge-sub-structure-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-sub-structure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeSubStructureColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, pierTypeMap)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeSubStructureCard
            onDetail={handleClickDetail}
            bridgeSubStructure={data}
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
            subject: 'bridgesubstructure'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeSubStructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeSubStructureList;
