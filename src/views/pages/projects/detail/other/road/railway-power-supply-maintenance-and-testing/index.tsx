// src/views/project/other/railway-power-supply-maintenance-and-testing/railway-power-supply-maintenance-and-testing-list.tsx

'use client';

import { Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_ENTITY_SUBJECT,
  RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { RailwayPowerSupplyMaintenanceAndTesting } from 'src/types/project/other'; // Assume this type exists
import type { GetRequestParam, IApiResponse } from 'src/types/requests';

// Utility Imports
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';

// Component Imports
import FileDrawer from 'src/views/components/custom/files-drawer';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ItemsListing from 'src/views/shared/listing';
import RailwayPowerSupplyMaintenanceAndTestingCard from './railway-power-supply-maintenance-and-testing-card';
import RailwayPowerSupplyMaintenanceAndTestingDrawer from './railway-power-supply-maintenance-and-testing-drawer';
import { railwayPowerSupplyMaintenanceAndTestingColumns } from './railway-power-supply-maintenance-and-testing-row';


interface RailwayPowerSupplyMaintenanceAndTestingListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayPowerSupplyMaintenanceAndTestingList: React.FC<RailwayPowerSupplyMaintenanceAndTestingListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayPowerSupplyMaintenanceAndTesting | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES[0].type;


  const fetchMaintenance = (params: GetRequestParam): Promise<IApiResponse<RailwayPowerSupplyMaintenanceAndTesting[]>> => {
    return projectOtherApiSecondService<RailwayPowerSupplyMaintenanceAndTesting>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: maintenanceData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayPowerSupplyMaintenanceAndTesting[]>({
    queryKey: ['railwayPowerSupplyMaintenanceAndTesting'],
    fetchFunction: fetchMaintenance
  });




  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyMaintenanceAndTesting);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyMaintenanceAndTesting);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayPowerSupplyMaintenanceAndTesting) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerSupplyMaintenanceAndTesting>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayPowerSupplyMaintenanceAndTesting) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const mapMaintenanceToDetailItems = (data: RailwayPowerSupplyMaintenanceAndTesting): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-maintenance-and-testing.details.platform-layout'),
      value: data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-maintenance-and-testing.details.maintenance-schedules-and-activities'),
      value: data?.maintenance_schedules_and_activities ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-power-supply-maintenance-and-testing.details.testing-and-commissioning-procedures'),
      value: data?.testing_and_commissioning_procedures ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-power-supply-maintenance-and-testing.details.recent-maintenance-records-date'),
      value: data?.recent_maintenance_records_date ? formatDate(data.recent_maintenance_records_date) : 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-maintenance-and-testing.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES.map(type => ({
      title: t(type.titleTKey),
      value: data?.id ? <FileDrawer id={data.id} type={type.type} /> : 'N/A'
    })),
    {
      title: t('common.table-columns.created-at'),
      value: data?.created_at ? formatCreatedAt(data.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: data?.updated_at ? formatCreatedAt(data.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayPowerSupplyMaintenanceAndTestingDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerSupplyMaintenanceAndTesting={selectedRow as RailwayPowerSupplyMaintenanceAndTesting}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMaintenanceToDetailItems(selectedRow as RailwayPowerSupplyMaintenanceAndTesting)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-power-supply-maintenance-and-testing.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-power-supply-maintenance-and-testing.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerSupplyMaintenanceAndTestingColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerSupplyMaintenanceAndTestingCard
            onDetail={handleClickDetail}
            railwayPowerSupplyMaintenanceAndTesting={data as RailwayPowerSupplyMaintenanceAndTesting}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING_FILE_TYPES}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: otherSubMenu?.model || entitySubject
          }
        }}
        fetchDataFunction={refetch}
        items={maintenanceData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayPowerSupplyMaintenanceAndTestingList;