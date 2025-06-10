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
import { RailwayFasteningSystemMaintenanceAndReplacement } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayFasteningSystemMaintenanceAndReplacementCard from './railway-fastening-system-maintenance-and-replacement-card';
import RailwayFasteningSystemMaintenanceAndReplacementDrawer from './railway-fastening-system-maintenance-and-replacement-drawer';
import { railwayFasteningSystemMaintenanceAndReplacementColumns } from './railway-fastening-system-maintenance-and-replacement-row';

interface RailwayFasteningSystemMaintenanceAndReplacementListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayFasteningSystemMaintenanceAndReplacementList: React.FC<
  RailwayFasteningSystemMaintenanceAndReplacementListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [
    selectedRow,
    setSelectedRow
  ] = useState<RailwayFasteningSystemMaintenanceAndReplacement | null>(null);
  const { t } = useTranslation();

  const fetchRailwayFasteningSystemMaintenanceAndReplacement = (
    params: GetRequestParam
  ): Promise<IApiResponse<RailwayFasteningSystemMaintenanceAndReplacement[]>> => {
    return projectOtherApiSecondService<RailwayFasteningSystemMaintenanceAndReplacement>().getAll(
      otherSubMenu?.apiRoute || '',
      {
        ...params,
        filter: { ...params.filter, project_id: projectId }
      }
    );
  };

  const {
    data: railwayFasteningSystemMaintenanceAndReplacement,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayFasteningSystemMaintenanceAndReplacement[]>({
    queryKey: ['railwayFasteningSystemMaintenanceAndReplacement'],
    fetchFunction: fetchRailwayFasteningSystemMaintenanceAndReplacement
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemMaintenanceAndReplacement);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayFasteningSystemMaintenanceAndReplacement);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (maintenance: RailwayFasteningSystemMaintenanceAndReplacement) => {
    toggleDrawer();
    setSelectedRow(maintenance);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayFasteningSystemMaintenanceAndReplacement>().delete(
      otherSubMenu?.apiRoute || '',
      id
    );
    refetch();
  };

  const handleClickDetail = (maintenance: RailwayFasteningSystemMaintenanceAndReplacement) => {
    toggleDetailDrawer();
    setSelectedRow(maintenance);
  };

  const mapRailwayFasteningSystemMaintenanceAndReplacementToDetailItems = (
    maintenance: RailwayFasteningSystemMaintenanceAndReplacement
  ): { title: string; value: string }[] => [
      {
        title: t('common.table-columns.id'),
        value: maintenance?.id || 'N/A'
      },
      {
        title: t(
          'project.other.railway-fastening-system-maintenance-and-replacement.details.railway_line_section_name'
        ),
        value: maintenance?.railway_line_section_name || 'N/A'
      },
      {
        title: t(
          'project.other.railway-fastening-system-maintenance-and-replacement.details.scheduled_maintenance_activities'
        ),
        value: maintenance?.scheduled_maintenance_activities || 'N/A'
      },
      {
        title: t(
          'project.other.railway-fastening-system-maintenance-and-replacement.details.recent_maintenance_records_and_dates'
        ),
        value: maintenance?.recent_maintenance_records_and_dates || 'N/A'
      },
      {
        title: t('project.other.railway-fastening-system-maintenance-and-replacement.details.remark'),
        value: maintenance?.remark || 'N/A'
      },
      {
        title: t('common.table-columns.created-at'),
        value: maintenance?.created_at ? formatCreatedAt(maintenance.created_at) : 'N/A'
      },
      {
        title: t('common.table-columns.updated-at'),
        value: maintenance?.updated_at ? formatCreatedAt(maintenance.updated_at) : 'N/A'
      }
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayFasteningSystemMaintenanceAndReplacementDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayFasteningSystemMaintenanceAndReplacement={
            selectedRow as RailwayFasteningSystemMaintenanceAndReplacement
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayFasteningSystemMaintenanceAndReplacementToDetailItems(
            selectedRow as RailwayFasteningSystemMaintenanceAndReplacement
          )}
          hasReference={Boolean(otherSubMenu?.fileType)}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || ''}
          title={t('project.other.railway-fastening-system-maintenance-and-replacement.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-fastening-system-maintenance-and-replacement.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayFasteningSystemMaintenanceAndReplacementColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayFasteningSystemMaintenanceAndReplacementCard
            onDetail={handleClickDetail}
            railwayFasteningSystemMaintenanceAndReplacement={
              data as RailwayFasteningSystemMaintenanceAndReplacement
            }
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'railwayfasteningsystemmaintenanceandreplacement'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayFasteningSystemMaintenanceAndReplacement || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayFasteningSystemMaintenanceAndReplacementList;