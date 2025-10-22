// src/views/project/other/railway-maintenance-facility-infrastructure-and-utility/railway-maintenance-facility-infrastructure-and-utility-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES,
  RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceFacilityInfrastructureAndUtility } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceFacilityInfrastructureAndUtilityCard from './railway-maintenance-facility-infrastructure-and-utility-card';
import RailwayMaintenanceFacilityInfrastructureAndUtilityDrawer from './railway-maintenance-facility-infrastructure-and-utility-drawer';
import { railwayMaintenanceFacilityInfrastructureAndUtilityColumns } from './railway-maintenance-facility-infrastructure-and-utility-row';


interface RailwayMaintenanceFacilityInfrastructureAndUtilityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceFacilityInfrastructureAndUtilityList: React.FC<RailwayMaintenanceFacilityInfrastructureAndUtilityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceFacilityInfrastructureAndUtility | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceFacilityInfrastructureAndUtility[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceFacilityInfrastructureAndUtility>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: recordData,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayMaintenanceFacilityInfrastructureAndUtility[]>({
    queryKey: ['railwayMaintenanceFacilityInfrastructureAndUtility'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityInfrastructureAndUtility);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityInfrastructureAndUtility);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceFacilityInfrastructureAndUtility) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceFacilityInfrastructureAndUtility>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceFacilityInfrastructureAndUtility) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceFacilityInfrastructureAndUtility): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.rail-tracks-and-turnout-availability'),
      value: booleanToText(data?.rail_tracks_and_turnout_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.fueling-and-refueling-facility-availability'),
      value: booleanToText(data?.fueling_and_refueling_facility_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.compressed-air-system-availability'),
      value: booleanToText(data?.compressed_air_system_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.remarks'),
      value: data?.remarks || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceFacilityInfrastructureAndUtilityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceFacilityInfrastructureAndUtility={selectedRow as RailwayMaintenanceFacilityInfrastructureAndUtility}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceFacilityInfrastructureAndUtility)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-facility-infrastructure-and-utilities.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-facility-infrastructure-and-utilities.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceFacilityInfrastructureAndUtilityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceFacilityInfrastructureAndUtilityCard
            onDetail={handleClickDetail}
            railwayMaintenanceFacilityInfrastructureAndUtility={data as RailwayMaintenanceFacilityInfrastructureAndUtility}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITY_FILE_TYPES}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: entitySubject
          }
        }}
        fetchDataFunction={refetch}
        items={recordData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayMaintenanceFacilityInfrastructureAndUtilityList;