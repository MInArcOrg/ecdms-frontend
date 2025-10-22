// src/views/project/other/railway-maintenance-facility-equipment-and-tool/railway-maintenance-facility-equipment-and-tool-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES,
  RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceFacilityEquipmentAndTool } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceFacilityEquipmentAndToolCard from './railway-maintenance-facility-equipment-and-tool-card';
import RailwayMaintenanceFacilityEquipmentAndToolDrawer from './railway-maintenance-facility-equipment-and-tool-drawer';
import { railwayMaintenanceFacilityEquipmentAndToolColumns } from './railway-maintenance-facility-equipment-and-tool-row';


interface RailwayMaintenanceFacilityEquipmentAndToolListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceFacilityEquipmentAndToolList: React.FC<RailwayMaintenanceFacilityEquipmentAndToolListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceFacilityEquipmentAndTool | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceFacilityEquipmentAndTool[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceFacilityEquipmentAndTool>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceFacilityEquipmentAndTool[]>({
    queryKey: ['railwayMaintenanceFacilityEquipmentAndTool'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityEquipmentAndTool);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityEquipmentAndTool);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceFacilityEquipmentAndTool) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceFacilityEquipmentAndTool>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceFacilityEquipmentAndTool) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceFacilityEquipmentAndTool): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.maintenance-equipment-and-tool-available-type'),
      value: data?.maintenance_equipment_and_tool_available_type || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.hoists-cranes-and-lifting-equipment'),
      value: booleanToText(data?.hoists_cranes_and_lifting_equipment)
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.diagnostic-and-testing-equipment'),
      value: data?.diagnostic_and_testing_equipment || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.tools-and-machinery-specific-to-maintenance-activities'),
      value: data?.tools_and_machinery_specific_to_maintenance_activities || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-equipment-and-tool.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceFacilityEquipmentAndToolDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceFacilityEquipmentAndTool={selectedRow as RailwayMaintenanceFacilityEquipmentAndTool}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceFacilityEquipmentAndTool)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-facility-equipment-and-tool.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-facility-equipment-and-tool.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceFacilityEquipmentAndToolColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceFacilityEquipmentAndToolCard
            onDetail={handleClickDetail}
            railwayMaintenanceFacilityEquipmentAndTool={data as RailwayMaintenanceFacilityEquipmentAndTool}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOL_FILE_TYPES}
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

export default RailwayMaintenanceFacilityEquipmentAndToolList;