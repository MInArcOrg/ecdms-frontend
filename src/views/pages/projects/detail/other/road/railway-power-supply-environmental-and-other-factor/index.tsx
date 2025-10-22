// src/views/project/other/railway-power-supply-environmental-and-other-factor/railway-power-supply-environmental-and-other-factor-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES,
  RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayPowerSupplyEnvironmentalAndOtherFactor } from 'src/types/project/other'; // Assume this type exists
import type { RailwayStationPlatformLayout } from 'src/types/project/other';

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayPowerSupplyEnvironmentalAndOtherFactorCard from './railway-power-supply-environmental-and-other-factor-card';
import RailwayPowerSupplyEnvironmentalAndOtherFactorDrawer from './railway-power-supply-environmental-and-other-factor-drawer';
import { railwayPowerSupplyEnvironmentalAndOtherFactorColumns } from './railway-power-supply-environmental-and-other-factor-row';


interface RailwayPowerSupplyEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayPowerSupplyEnvironmentalAndOtherFactorList: React.FC<RailwayPowerSupplyEnvironmentalAndOtherFactorListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayPowerSupplyEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES.find(f => f.key === 'mainDocument')?.type || RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayPowerSupplyEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwayPowerSupplyEnvironmentalAndOtherFactor>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayPowerSupplyEnvironmentalAndOtherFactor[]>({
    queryKey: ['railwayPowerSupplyEnvironmentalAndOtherFactor'],
    fetchFunction: fetchRecord
  });




  const toggleDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayPowerSupplyEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayPowerSupplyEnvironmentalAndOtherFactor) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayPowerSupplyEnvironmentalAndOtherFactor>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayPowerSupplyEnvironmentalAndOtherFactor) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const mapRecordToDetailItems = (data: RailwayPowerSupplyEnvironmentalAndOtherFactor): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-environmental-and-other-factor.details.platform-layout'),
      value: data?.railwayStationPlatformLayout?.name || data?.railway_station_platform_layout_id || 'N/A'
    },
    {
      title: t('project.other.railway-power-supply-environmental-and-other-factor.details.environmental-compliance-measures'),
      value: data?.environmental_compliance_measures || 'N/A'
    },
    ...RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES.map(type => ({
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
        <RailwayPowerSupplyEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayPowerSupplyEnvironmentalAndOtherFactor={selectedRow as RailwayPowerSupplyEnvironmentalAndOtherFactor}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayPowerSupplyEnvironmentalAndOtherFactor)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-power-supply-environmental-and-other-factor.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-power-supply-environmental-and-other-factor.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayPowerSupplyEnvironmentalAndOtherFactorColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayPowerSupplyEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwayPowerSupplyEnvironmentalAndOtherFactor={data as RailwayPowerSupplyEnvironmentalAndOtherFactor}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES}
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

export default RailwayPowerSupplyEnvironmentalAndOtherFactorList;