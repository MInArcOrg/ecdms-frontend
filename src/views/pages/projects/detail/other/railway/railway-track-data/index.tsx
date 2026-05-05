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
import type { RailwayTrackData } from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from '../../../../../../shared/layouts/other/other-detail-drawer';
import RailwayTrackDataCard from './railway-track-data-card';
import RailwayTrackDataDrawer from './railway-track-data-drawer';
import { railwayTrackDataColumns } from './railway-track-data-row';

interface RailwayTrackDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}
const RailwayTrackDataList: React.FC<RailwayTrackDataListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayTrackData | null>(null);
  const { t } = useTranslation();

  const fetchRailwayTrackData = (params: GetRequestParam): Promise<IApiResponse<RailwayTrackData[]>> => {
    return projectOtherApiSecondService<RailwayTrackData>().getAll(otherSubMenu?.apiRoute || '', {});
  };

  const {
    data: railwayTrackData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayTrackData[]>({
    queryKey: ['railwayTrackData'],
    fetchFunction: fetchRailwayTrackData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTrackData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTrackData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayTrackData: RailwayTrackData) => {
    toggleDrawer();
    setSelectedRow(railwayTrackData);
  };

  const handleDelete = async (railwayTrackDataId: string) => {
    await projectOtherApiSecondService<RailwayTrackData>().delete(otherSubMenu?.apiRoute || '', railwayTrackDataId);
    refetch();
  };

  const handleClickDetail = (railwayTrackData: RailwayTrackData) => {
    toggleDetailDrawer();
    setSelectedRow(railwayTrackData);
  };

  const mapRailwayTrackDataToDetailItems = (railwayTrackData: RailwayTrackData): { title: string; value: string }[] => [
    {
      title: t('project.other.railway-track-data.details.project-id'),
      value: railwayTrackData?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.name'),
      value: railwayTrackData?.name || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.railway-track-infrastructure-type-id'),
      value: railwayTrackData?.railwayTrackInfrastructureType?.title || railwayTrackData?.railway_track_infrastructure_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.track-type-id'),
      value: railwayTrackData?.trackType?.title || railwayTrackData?.track_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.track-gauge-id'),
      value: railwayTrackData?.trackGauge?.title || railwayTrackData?.track_gauge_id || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.track-length'),
      value: railwayTrackData?.track_length !== undefined ? railwayTrackData.track_length.toString() : 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.rail-type-and-size'),
      value: railwayTrackData?.rail_type_and_size || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.sleepers-type-and-spacing'),
      value: railwayTrackData?.sleepers_type_and_spacing || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.fastening-systems'),
      value: railwayTrackData?.fastening_systems || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.ballast-type-and-depth'),
      value: railwayTrackData?.ballast_type_and_depth || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.track-connection-method'),
      value: railwayTrackData?.track_connection_method || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.track-type'),
      value: railwayTrackData?.track_type || 'N/A'
    },
    {
      title: t('project.other.railway-track-data.details.remark'),
      value: railwayTrackData?.remark || 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTrackDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayTrackData={selectedRow as RailwayTrackData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayTrackDataToDetailItems(selectedRow as RailwayTrackData)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={uploadableProjectFileTypes.other.electric_grid_control_center_data}
          title={t('project.other.railway-track-data.railway-track-data-details')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-track-data.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayTrackDataColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTrackDataCard
            onDetail={handleClickDetail}
            railwayTrackData={data}
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
            subject: 'railwaytrackdata'
          }
        }}
        fetchDataFunction={refetch}
        items={railwayTrackData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTrackDataList;
