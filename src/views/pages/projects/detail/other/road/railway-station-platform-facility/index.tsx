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
import { RailwayStationPlatformFacility } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayStationPlatformFacilityCard from './railway-station-platform-facility-card';
import RailwayStationPlatformFacilityDrawer from './railway-station-platform-facility-drawer';
import { railwayStationPlatformFacilityColumns } from './railway-station-platform-facility-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayStationPlatformFacilityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformFacilityList: React.FC<RailwayStationPlatformFacilityListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayStationPlatformFacility | null>(null);
  const { t } = useTranslation();

  const fetchPlatformFacility = (params: GetRequestParam): Promise<IApiResponse<RailwayStationPlatformFacility[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformFacility>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: platformFacility,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayStationPlatformFacility[]>({
    queryKey: ['railwayStationPlatformFacility'],
    fetchFunction: fetchPlatformFacility
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformFacility);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformFacility);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayStationPlatformFacility) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformFacility>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayStationPlatformFacility) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapPlatformFacilityToDetailItems = (specs: RailwayStationPlatformFacility): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-station-platform-facility.details.railway_station_platform_layout_id'),
      value: specs?.railwayStationPlatformLayout
        ? specs?.railwayStationPlatformLayout.name || specs.railway_station_platform_layout_id
        : 'N/A'
    },
    {
      title: t('project.other.railway-station-platform-facility.details.waiting_areas_seating_capacity'),
      value: specs?.waiting_areas_seating_capacity ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-station-platform-facility.details.ticketing_facilities_availability'),
      value: specs?.ticketing_facilities_availability ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-station-platform-facility.details.restrooms_and_amenities_availability'),
      value: specs?.restrooms_and_amenities_availability ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-station-platform-facility.details.passenger_information_system'),
      value: specs?.passenger_information_system || 'N/A'
    },
    {
      title: t('project.other.railway-station-platform-facility.details.accessibility_features'),
      value: specs?.accessibility_features || 'N/A'
    },
    {
      title: t('project.other.railway-station-platform-facility.details.remark'),
      value: specs?.remark || 'N/A'
    },
    {
      title: t('common.form.attachments'),
      value: <FileDrawer id={specs.id} type={otherSubMenu?.fileType || ''} />
    },
    {
      title: t('common.table-columns.created-at'),
      value: specs?.created_at ? formatCreatedAt(specs.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: specs?.updated_at ? formatCreatedAt(specs.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayStationPlatformFacilityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformFacility={selectedRow as RailwayStationPlatformFacility}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPlatformFacilityToDetailItems(selectedRow as RailwayStationPlatformFacility)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_STATION_PLATFORM_FACILITY'}
          title={t('project.other.railway-station-platform-facility.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-station-platform-facility.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformFacilityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayStationPlatformFacilityCard
            onDetail={handleClickDetail}
            railwayStationPlatformFacility={data as RailwayStationPlatformFacility}
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
            subject: 'railwaystationplatformfacility'
          }
        }}
        fetchDataFunction={refetch}
        items={platformFacility || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformFacilityList;
