// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES,
  RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other'; // Model from types file
import type { RailwayStationPlatformLayout } from 'src/types/project/other';

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayPowerSupplySafetyAndComplianceCard from './railway-power-supply-safety-and-compliance-card';
import RailwayPowerSupplySafetyAndComplianceDrawer from './railway-power-supply-safety-and-compliance-drawer';
import { railwayPowerSupplySafetyAndComplianceColumns } from './railway-power-supply-safety-and-compliance-row';


interface RailwayPowerSupplySafetyAndComplianceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayPowerSupplySafetyAndComplianceList: React.FC<RailwayPowerSupplySafetyAndComplianceListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayPowerSupplySafetyAndCompliance | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES.find(f => f.key === 'mainDocument')?.type || RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayPowerSupplySafetyAndCompliance[]>> => {
    return projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayPowerSupplySafetyAndCompliance[]>({
    queryKey: ['railwayPowerSupplySafetyAndCompliance'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplySafetyAndCompliance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplySafetyAndCompliance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayPowerSupplySafetyAndCompliance) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerSupplySafetyAndCompliance>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayPowerSupplySafetyAndCompliance) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayPowerSupplySafetyAndCompliance): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-safety-and-compliance.details.platform-layout'),
      value: data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-safety-and-compliance.details.safety-measures-and-protocols'),
      value: booleanToText(data?.safety_measures_and_protocols)
    },
    {
      title: t('project.other.railway-power-supply-safety-and-compliance.details.compliance-with-electrical-safety-standards-and-regulations'),
      value: booleanToText(data?.compliance_with_electrical_safety_standards_and_regulations)
    },
    {
      title: t('project.other.railway-power-supply-safety-and-compliance.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES.map(type => ({
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
        <RailwayPowerSupplySafetyAndComplianceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerSupplySafetyAndCompliance={selectedRow as RailwayPowerSupplySafetyAndCompliance}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayPowerSupplySafetyAndCompliance)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-power-supply-safety-and-compliance.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-power-supply-safety-and-compliance.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerSupplySafetyAndComplianceColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerSupplySafetyAndComplianceCard
            onDetail={handleClickDetail}
            railwayPowerSupplySafetyAndCompliance={data as RailwayPowerSupplySafetyAndCompliance}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE_FILE_TYPES}
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

export default RailwayPowerSupplySafetyAndComplianceList;