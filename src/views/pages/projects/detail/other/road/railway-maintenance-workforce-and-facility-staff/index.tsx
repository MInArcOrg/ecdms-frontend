// src/views/project/other/railway-maintenance-workforce-and-facility-staff/railway-maintenance-workforce-and-facility-staff-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES,
  RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceWorkforceAndFacilityStaff } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceWorkforceAndFacilityStaffCard from './railway-maintenance-workforce-and-facility-staff-card';
import RailwayMaintenanceWorkforceAndFacilityStaffDrawer from './railway-maintenance-workforce-and-facility-staff-drawer';
import { railwayMaintenanceWorkforceAndFacilityStaffColumns } from './railway-maintenance-workforce-and-facility-staff-row';


interface RailwayMaintenanceWorkforceAndFacilityStaffListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceWorkforceAndFacilityStaffList: React.FC<RailwayMaintenanceWorkforceAndFacilityStaffListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceWorkforceAndFacilityStaff | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceWorkforceAndFacilityStaff[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceWorkforceAndFacilityStaff>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceWorkforceAndFacilityStaff[]>({
    queryKey: ['railwayMaintenanceWorkforceAndFacilityStaff'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceWorkforceAndFacilityStaff);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceWorkforceAndFacilityStaff);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceWorkforceAndFacilityStaff) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceWorkforceAndFacilityStaff>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceWorkforceAndFacilityStaff) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceWorkforceAndFacilityStaff): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.maintenance-personnel-number'),
      value: data?.maintenance_personnel_number || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.staff-facilities'),
      value: booleanToText(data?.staff_facilities)
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.training-facilities-and-resources'),
      value: booleanToText(data?.training_facilities_and_resources)
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.trainers-instructors-number'),
      value: data?.trainers_instructors_number || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-workforce-and-facility-staff.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceWorkforceAndFacilityStaffDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceWorkforceAndFacilityStaff={selectedRow as RailwayMaintenanceWorkforceAndFacilityStaff}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceWorkforceAndFacilityStaff)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-workforce-and-facility-staff.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-workforce-and-facility-staff.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceWorkforceAndFacilityStaffColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceWorkforceAndFacilityStaffCard
            onDetail={handleClickDetail}
            railwayMaintenanceWorkforceAndFacilityStaff={data as RailwayMaintenanceWorkforceAndFacilityStaff}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_WORKFORCE_AND_FACILITY_STAFF_FILE_TYPES}
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
        items={recordData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayMaintenanceWorkforceAndFacilityStaffList;