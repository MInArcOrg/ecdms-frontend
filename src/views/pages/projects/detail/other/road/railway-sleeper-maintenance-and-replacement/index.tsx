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
import { RailwaySleeperMaintenanceAndReplacement } from 'src/types/project/other';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';

import RailwaySleeperMaintenanceAndReplacementCard from './railway-sleeper-maintenance-and-replacement-card';
import RailwaySleeperMaintenanceAndReplacementDrawer from './railway-sleeper-maintenance-and-replacement-drawer';
import { railwaySleeperMaintenanceAndReplacementColumns } from './railway-sleeper-maintenance-and-replacement-row';

interface RailwaySleeperMaintenanceAndReplacementListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySleeperMaintenanceAndReplacementList: React.FC<RailwaySleeperMaintenanceAndReplacementListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySleeperMaintenanceAndReplacement | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySleeperMaintenanceAndReplacement = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwaySleeperMaintenanceAndReplacement[]>> => {
    return projectOtherApiSecondService<RailwaySleeperMaintenanceAndReplacement>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: railwaySleeperMaintenanceAndReplacement,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySleeperMaintenanceAndReplacement[]>({
    queryKey: ['railwaySleeperMaintenanceAndReplacement'],
    fetchFunction: fetchRailwaySleeperMaintenanceAndReplacement
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySleeperMaintenanceAndReplacement);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySleeperMaintenanceAndReplacement);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement) => {
    toggleDrawer();
    setSelectedRow(railwaySleeperMaintenanceAndReplacement);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySleeperMaintenanceAndReplacement>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement) => {
    toggleDetailDrawer();
    setSelectedRow(railwaySleeperMaintenanceAndReplacement);
  };

  const mapRailwaySleeperMaintenanceAndReplacementToDetailItems = (
    railwaySleeperMaintenanceAndReplacement: RailwaySleeperMaintenanceAndReplacement
  ): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: railwaySleeperMaintenanceAndReplacement?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.railway_line_section_name'),
      value: railwaySleeperMaintenanceAndReplacement?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.scheduled_maintenance_activities'),
      value: railwaySleeperMaintenanceAndReplacement?.scheduled_maintenance_activities || 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.recent_maintenance_date'),
      value: railwaySleeperMaintenanceAndReplacement?.recent_maintenance_date
        ? formatDynamicDate(railwaySleeperMaintenanceAndReplacement?.recent_maintenance_date)
        : 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.inspection_reports'),
      value: railwaySleeperMaintenanceAndReplacement?.inspection_reports || 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.sleeper_replacement_history'),
      value: railwaySleeperMaintenanceAndReplacement?.sleeper_replacement_history || 'N/A'
    },
    {
      title: t('project.other.railway-sleeper-maintenance-and-replacement.details.remark'),
      value: railwaySleeperMaintenanceAndReplacement?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: railwaySleeperMaintenanceAndReplacement?.created_at
        ? formatCreatedAt(railwaySleeperMaintenanceAndReplacement.created_at)
        : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: railwaySleeperMaintenanceAndReplacement?.updated_at
        ? formatCreatedAt(railwaySleeperMaintenanceAndReplacement.updated_at)
        : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySleeperMaintenanceAndReplacementDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySleeperMaintenanceAndReplacement={selectedRow as RailwaySleeperMaintenanceAndReplacement}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySleeperMaintenanceAndReplacementToDetailItems(selectedRow as RailwaySleeperMaintenanceAndReplacement)}
          hasReference={false}
          id={selectedRow?.project_id || ''}
          fileType=""
          title={t('project.other.railway-sleeper-maintenance-and-replacement.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-sleeper-maintenance-and-replacement.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySleeperMaintenanceAndReplacementColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySleeperMaintenanceAndReplacementCard
            onDetail={handleClickDetail}
            railwaySleeperMaintenanceAndReplacement={data as RailwaySleeperMaintenanceAndReplacement}
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
            subject: 'railwaysleepermaintenanceandreplacement'
          }
        }}
        fetchDataFunction={refetch}
        items={railwaySleeperMaintenanceAndReplacement || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySleeperMaintenanceAndReplacementList;
