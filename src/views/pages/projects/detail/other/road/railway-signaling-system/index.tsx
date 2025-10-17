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
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import { RailwaySignalingSystem } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwaySignalingSystemCard from './railway-signaling-system-card';
import RailwaySignalingSystemDrawer from './railway-signaling-system-drawer';
import { railwaySignalingSystemColumns } from './railway-signaling-system-row';

interface RailwaySignalingSystemListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySignalingSystemList: React.FC<RailwaySignalingSystemListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySignalingSystem | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySignalingSystem = (params: GetRequestParam): Promise<IApiResponse<RailwaySignalingSystem[]>> => {
    return projectOtherApiSecondService<RailwaySignalingSystem>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwaySignalingSystems,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySignalingSystem[]>({
    queryKey: ['railwaySignalingSystems'],
    fetchFunction: fetchRailwaySignalingSystem
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySignalingSystem);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySignalingSystem);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (signalingSystem: RailwaySignalingSystem) => {
    toggleDrawer();
    setSelectedRow(signalingSystem);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySignalingSystem>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (signalingSystem: RailwaySignalingSystem) => {
    toggleDetailDrawer();
    setSelectedRow(signalingSystem);
  };

  const mapRailwaySignalingSystemToDetailItems = (signalingSystem: RailwaySignalingSystem): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: signalingSystem?.id || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.railway_line_section_name'),
      value: signalingSystem?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.signaling_system_type'),
      value: signalingSystem?.signaling_system_type || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_name'),
      value: signalingSystem?.signaling_system_manufacturer_or_supplier_name || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_phone'),
      value: signalingSystem?.signaling_system_manufacturer_or_supplier_phone || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.signaling_system_components'),
      value: signalingSystem?.signaling_system_components || 'N/A'
    },
    {
      title: t('project.other.railway-signaling-system.details.remark'),
      value: signalingSystem?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: signalingSystem?.created_at ? formatCreatedAt(signalingSystem.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: signalingSystem?.updated_at ? formatCreatedAt(signalingSystem.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySignalingSystemDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySignalingSystem={selectedRow as RailwaySignalingSystem}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySignalingSystemToDetailItems(selectedRow as RailwaySignalingSystem)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.id || ''}
          title={t('project.other.railway-signaling-system.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-signaling-system.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySignalingSystemColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySignalingSystemCard
            onDetail={handleClickDetail}
            railwaySignalingSystem={data as RailwaySignalingSystem}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwaysignalingsystem'
          }
        }}
        fetchDataFunction={refetch}
        items={railwaySignalingSystems || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySignalingSystemList;
