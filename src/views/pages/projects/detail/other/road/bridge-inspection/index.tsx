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
import type { BridgeInspection } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import BridgeInspectionCard from './bridge-inspection-card';
import BridgeInspectionDrawer from './bridge-inspection-drawer';
import { bridgeInspectionColumns } from './bridge-inspection-row';

interface BridgeInspectionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const BridgeInspectionList: React.FC<BridgeInspectionListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<BridgeInspection | null>(null);
  const { t } = useTranslation();

  const fetchBridgeInspections = (params: GetRequestParam): Promise<IApiResponse<BridgeInspection[]>> => {
    return projectOtherApiSecondService<BridgeInspection>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: bridgeInspections,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeInspection[]>({
    queryKey: ['bridgeInspections'],
    fetchFunction: fetchBridgeInspections
  });

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeInspection);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as BridgeInspection);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (bridgeInspection: BridgeInspection) => {
    toggleDrawer();
    setSelectedRow(bridgeInspection);
  };

  const handleDelete = async (bridgeInspectionId: string) => {
    await projectOtherApiSecondService<BridgeInspection>().delete(otherSubMenu?.apiRoute || '', bridgeInspectionId);
    refetch();
  };

  const handleClickDetail = (bridgeInspection: BridgeInspection) => {
    toggleDetailDrawer();
    setSelectedRow(bridgeInspection);
  };

  const mapBridgeInspectionToDetailItems = (bridgeInspection: BridgeInspection): { title: string; value: string }[] => [
    {
      title: t('project.other.bridge-inspection.details.name'),
      value: bridgeInspection?.name || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.bridge-name'),
      value: bridgeInspection?.name || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.bridge-part-defect-id'),
      value: bridgeInspection?.bridge_part_defect_id || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.damage-type-id'),
      value: bridgeInspection?.damage_type_id || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.damage-condition-id'),
      value: bridgeInspection?.damage_condition_id || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.hydrology-defect-id'),
      value: bridgeInspection?.hydrology_defect_id || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.maintenance-action'),
      value: bridgeInspection?.maintenance_action || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.bridge-history'),
      value: bridgeInspection?.bridge_history || 'N/A'
    },
    {
      title: t('project.other.bridge-inspection.details.inspector-remark'),
      value: bridgeInspection?.inspector_remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: bridgeInspection?.created_at ? formatCreatedAt(bridgeInspection.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: bridgeInspection?.updated_at ? formatCreatedAt(bridgeInspection.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <BridgeInspectionDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          bridgeInspection={selectedRow as BridgeInspection}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapBridgeInspectionToDetailItems(selectedRow as BridgeInspection)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.bridgeInspection}
          title={t('project.other.bridge-inspection.bridge-inspection-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.bridge-inspection.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: bridgeInspectionColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <BridgeInspectionCard
            onDetail={handleClickDetail}
            bridgeInspection={data}
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
            subject: 'bridgeinspection'
          }
        }}
        fetchDataFunction={refetch}
        items={bridgeInspections || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default BridgeInspectionList;
