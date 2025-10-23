// src/views/project/other/railway-maintenance-facility-and-security/railway-maintenance-facility-and-security-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES,
  RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceFacilityAndSecurity } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceFacilityAndSecurityCard from './railway-maintenance-facility-and-security-card';
import RailwayMaintenanceFacilityAndSecurityDrawer from './railway-maintenance-facility-and-security-drawer';
import { railwayMaintenanceFacilityAndSecurityColumns } from './railway-maintenance-facility-and-security-row';


interface RailwayMaintenanceFacilityAndSecurityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceFacilityAndSecurityList: React.FC<RailwayMaintenanceFacilityAndSecurityListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceFacilityAndSecurity | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceFacilityAndSecurity[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceFacilityAndSecurity>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceFacilityAndSecurity[]>({
    queryKey: ['railwayMaintenanceFacilityAndSecurity'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityAndSecurity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityAndSecurity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceFacilityAndSecurity) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceFacilityAndSecurity>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceFacilityAndSecurity) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceFacilityAndSecurity): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-and-security.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-and-security.details.fire-safety-measures'),
      value: data?.fire_safety_measures || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-and-security.details.ventilations-and-exhaust-system-availability'),
      value: booleanToText(data?.ventilation_and_exhaust_system_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-and-security.details.security-measures'),
      value: data?.security_measures || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-and-security.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceFacilityAndSecurityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceFacilityAndSecurity={selectedRow as RailwayMaintenanceFacilityAndSecurity}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceFacilityAndSecurity)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-facility-and-security.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-facility-and-security.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceFacilityAndSecurityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceFacilityAndSecurityCard
            onDetail={handleClickDetail}
            railwayMaintenanceFacilityAndSecurity={data as RailwayMaintenanceFacilityAndSecurity}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_AND_SECURITY_FILE_TYPES}
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

export default RailwayMaintenanceFacilityAndSecurityList;