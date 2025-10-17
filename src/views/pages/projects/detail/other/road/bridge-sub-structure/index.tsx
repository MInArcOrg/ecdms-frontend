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
import type { BridgeSubStructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeSubStructureCard from './bridge-sub-structure-card';
import BridgeSubStructureDrawer from './bridge-sub-structure-drawer';
import { bridgeSubStructureColumns } from './bridge-sub-structure-row';

interface BridgeSubStructureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeSubStructureList: React.FC<BridgeSubStructureListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeSubStructure | null>(null);
  const { t } = useTranslation();

  const fetchBridgeSubStructures = (params: GetRequestParam): Promise<IApiResponse<BridgeSubStructure[]>> => {
    return projectOtherApiSecondService<BridgeSubStructure>().getAll(otherSubMenu?.apiRoute || '', {
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
    setSelectedRow({} as BridgeSubStructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeSubStructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeSubStructure: BridgeSubStructure) => {
    toggleDrawer();
    setSelectedRow(bridgeSubStructure);
  };

  const handleDelete = async (bridgeSubStructureId: string) => {
    await projectOtherApiSecondService<BridgeSubStructure>().delete(otherSubMenu?.apiRoute || '', bridgeSubStructureId);
    refetch();
  };

  const handleClickDetail = (bridgeSubStructure: BridgeSubStructure) => {
    toggleDetailDrawer();
    setSelectedRow(bridgeSubStructure);
  };

  const mapBridgeSubStructureToDetailItems = (bridgeSubStructure: BridgeSubStructure): { title: string; value: string }[] => [
    {
      title: t('project.other.bridge-sub-structure.details.name'),
      value: bridgeSubStructure?.name || 'N/A'
    },
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
      value: bridgeSubStructure?.pier_type_id || 'N/A'
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
    },
    {
      title: t('common.table-columns.updated-at'),
      value: bridgeSubStructure?.updated_at ? formatCreatedAt(bridgeSubStructure.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeSubStructureDrawer
          otherSubMenu={otherSubMenu}
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
          data={mapBridgeSubStructureToDetailItems(selectedRow as BridgeSubStructure)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.bridge-sub-structure.bridge-sub-structure-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-sub-structure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeSubStructureColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
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
          onlyIcon: false,
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
