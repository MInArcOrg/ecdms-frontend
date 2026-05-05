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
import type { BridgeSuperStructure } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeSuperStructureCard from './bridge-super-structure-card';
import BridgeSuperStructureDrawer from './bridge-super-structure-drawer';
import { bridgeSuperStructureColumns } from './bridge-super-structure-row';

interface BridgeSuperStructureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeSuperStructureList: React.FC<BridgeSuperStructureListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeSuperStructure | null>(null);
  const { t } = useTranslation();

  const fetchBridgeSuperStructures = (params: GetRequestParam): Promise<IApiResponse<BridgeSuperStructure[]>> => {
    return projectOtherApiSecondService<BridgeSuperStructure>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeSuperStructures,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeSuperStructure[]>({
    queryKey: ['bridgeSuperStructures'],
    fetchFunction: fetchBridgeSuperStructures
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeSuperStructure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeSuperStructure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeSuperStructure: BridgeSuperStructure) => {
    toggleDrawer();
    setSelectedRow(bridgeSuperStructure);
  };

  const handleDelete = async (bridgeSuperStructureId: string) => {
    await projectOtherApiSecondService<BridgeSuperStructure>().delete(otherSubMenu?.apiRoute || '', bridgeSuperStructureId);
    refetch();
  };

  const handleClickDetail = (bridgeSuperStructure: BridgeSuperStructure) => {
    toggleDetailDrawer();
    setSelectedRow(bridgeSuperStructure);
  };

  const mapBridgeSuperStructureToDetailItems = (bridgeSuperStructure: BridgeSuperStructure): { title: string; value: string }[] => [
    {
      title: t('project.other.bridge-super-structure.details.bridge-name'),
      value: bridgeSuperStructure?.bridge?.name || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.bridge-structure-type-id'),
      value: bridgeSuperStructure?.bridgeStructureType?.title || bridgeSuperStructure?.bridge_structure_type_id || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.span-number'),
      value: bridgeSuperStructure?.span_number !== null && bridgeSuperStructure?.span_number !== undefined ? bridgeSuperStructure.span_number.toString() : 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.span-composition'),
      value: bridgeSuperStructure?.span_composition || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.total-span-length'),
      value: bridgeSuperStructure?.total_span_length?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.carriage-width'),
      value: bridgeSuperStructure?.carriage_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.side-walk-width'),
      value: bridgeSuperStructure?.side_walk_width?.toString() || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.lane-number'),
      value: bridgeSuperStructure?.lane_number !== null && bridgeSuperStructure?.lane_number !== undefined ? bridgeSuperStructure.lane_number.toString() : 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.span-support-type-id'),
      value: bridgeSuperStructure?.spanSupportType?.title || bridgeSuperStructure?.span_support_type_id || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.deck-slab-type-id'),
      value: bridgeSuperStructure?.deckSlabType?.title || bridgeSuperStructure?.deck_slab_type_id || 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.girder-number'),
      value:
        bridgeSuperStructure?.girder_number !== null && bridgeSuperStructure?.girder_number !== undefined ? bridgeSuperStructure.girder_number.toString() : 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.girder-depth'),
      value:
        bridgeSuperStructure?.girder_depth !== null && bridgeSuperStructure?.girder_depth !== undefined ? bridgeSuperStructure.girder_depth.toString() : 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.girder-spacing'),
      value:
        bridgeSuperStructure?.girder_spacing !== null && bridgeSuperStructure?.girder_spacing !== undefined
          ? bridgeSuperStructure.girder_spacing.toString()
          : 'N/A'
    },
    {
      title: t('project.other.bridge-super-structure.details.girder-width'),
      value:
        bridgeSuperStructure?.girder_width !== null && bridgeSuperStructure?.girder_width !== undefined ? bridgeSuperStructure.girder_width.toString() : 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeSuperStructure?.created_at ? formatCreatedAt(bridgeSuperStructure.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: bridgeSuperStructure?.updated_at ? formatCreatedAt(bridgeSuperStructure.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeSuperStructureDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeSuperStructure={selectedRow as BridgeSuperStructure}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeSuperStructureToDetailItems(selectedRow as BridgeSuperStructure)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType=""
          title={t('project.other.bridge-super-structure.bridge-super-structure-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-super-structure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeSuperStructureColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeSuperStructureCard
            onDetail={handleClickDetail}
            bridgeSuperStructure={data}
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
            subject: 'bridgesuperstructure'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeSuperStructures || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeSuperStructureList;
