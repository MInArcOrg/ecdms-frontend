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
import { RailwayTrackMaintenanceAndInspection } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RailwayTrackDataCard from './railway-track-maintenance-inspection-card';
import RailwayTrackDataDrawer from './railway-track-maintenance-inspection-data-drawer';
import { railwayTrackMaintenanceAndInspectionColumns } from './railway-track-maintenance-inspection-row';

interface RailwayTrackMaintenanceAndInspectionListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}
const RailwayTrackMaintenanceAndInspectionList: React.FC<RailwayTrackMaintenanceAndInspectionListProps> = ({
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayTrackMaintenanceAndInspection | null>(null);
  const { t } = useTranslation();

  const fetchRailwayTrackData = (params: GetRequestParam): Promise<IApiResponse<RailwayTrackMaintenanceAndInspection[]>> => {
    return projectOtherApiSecondService<RailwayTrackMaintenanceAndInspection>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: railwayTrackMaintenanceAndInspection,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayTrackMaintenanceAndInspection[]>({
    queryKey: ['railwayTrackMaintenanceAndInspection'],
    fetchFunction: fetchRailwayTrackData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTrackMaintenanceAndInspection);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTrackMaintenanceAndInspection);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayTrackMaintenanceAndInspection) => {
    toggleDrawer();
    setSelectedRow(row);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayTrackMaintenanceAndInspection>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (row: RailwayTrackMaintenanceAndInspection) => {
    toggleDetailDrawer();
    setSelectedRow(row);
  };

  const mapRailwayTrackDataToDetailItems = (row: RailwayTrackMaintenanceAndInspection): { title: string; value: string }[] => [
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.project-id'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.scheduled-maintenance-activity-id'),
      value: row?.scheduled_maintenance_activity_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.maintenance-method'),
      value: row?.maintenance_method || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.track-maintenance-frequency-id'),
      value: row?.track_maintenance_frequency_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.recent-maintenance-date'),
      value: row?.recent_maintenance_date || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.inspection-reports-and-findings'),
      value: row?.inspection_reports_and_findings || 'N/A'
    },
    {
      title: t('project.other.railway-track-maintenance-and-inspection.details.remark'),
      value: row?.remark || 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTrackDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayTrackMaintenanceAndInspection={selectedRow as RailwayTrackMaintenanceAndInspection}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayTrackDataToDetailItems(selectedRow as RailwayTrackMaintenanceAndInspection)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electric_grid_control_center_data}
          title={t('project.other.railway-track-maintenance-and-inspection.railway-track-maintenance-and-inspection-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-track-maintenance-and-inspection.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayTrackMaintenanceAndInspectionColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTrackDataCard
            onDetail={handleClickDetail}
            railwayTrackMaintenanceAndInspection={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            t={t}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwaytrackmaintenanceandinspection'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayTrackMaintenanceAndInspection || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTrackMaintenanceAndInspectionList;
