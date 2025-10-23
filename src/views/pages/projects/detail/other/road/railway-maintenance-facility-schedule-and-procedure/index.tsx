// src/views/project/other/railway-maintenance-facility-schedule-and-procedure/railway-maintenance-facility-schedule-and-procedure-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES,
  RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceFacilityScheduleAndProcedure } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceFacilityScheduleAndProcedureCard from './railway-maintenance-facility-schedule-and-procedure-card';
import RailwayMaintenanceFacilityScheduleAndProcedureDrawer from './railway-maintenance-facility-schedule-and-procedure-drawer';
import { railwayMaintenanceFacilityScheduleAndProcedureColumns } from './railway-maintenance-facility-schedule-and-procedure-row';


interface RailwayMaintenanceFacilityScheduleAndProcedureListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceFacilityScheduleAndProcedureList: React.FC<RailwayMaintenanceFacilityScheduleAndProcedureListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceFacilityScheduleAndProcedure | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceFacilityScheduleAndProcedure[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceFacilityScheduleAndProcedure>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceFacilityScheduleAndProcedure[]>({
    queryKey: ['railwayMaintenanceFacilityScheduleAndProcedure'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityScheduleAndProcedure);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityScheduleAndProcedure);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceFacilityScheduleAndProcedure) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceFacilityScheduleAndProcedure>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceFacilityScheduleAndProcedure) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceFacilityScheduleAndProcedure): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-schedule-and-procedure.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-schedule-and-procedure.details.maintenance-schedules-and-routines-availability'),
      value: booleanToText(data?.maintenance_schedules_and_routines_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-schedule-and-procedure.details.procedures-for-planned-and-preventive-maintenance-availability'),
      value: booleanToText(data?.procedures_for_planned_and_preventive_maintenance_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-schedule-and-procedure.details.documentation-and-record-keeping-practices-availability'),
      value: booleanToText(data?.documentation_and_record_keeping_practices_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-schedule-and-procedure.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceFacilityScheduleAndProcedureDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceFacilityScheduleAndProcedure={selectedRow as RailwayMaintenanceFacilityScheduleAndProcedure}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceFacilityScheduleAndProcedure)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-facility-schedule-and-procedure.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-facility-schedule-and-procedure.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceFacilityScheduleAndProcedureColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceFacilityScheduleAndProcedureCard
            onDetail={handleClickDetail}
            railwayMaintenanceFacilityScheduleAndProcedure={data as RailwayMaintenanceFacilityScheduleAndProcedure}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_SCHEDULE_AND_PROCEDURE_FILE_TYPES}
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

export default RailwayMaintenanceFacilityScheduleAndProcedureList;