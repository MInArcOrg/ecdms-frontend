// src/views/project/other/railway-maintenance-environmental-and-other-factor/railway-maintenance-environmental-and-other-factor-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES,
  RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceEnvironmentalAndOtherFactor } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceEnvironmentalAndOtherFactorCard from './railway-maintenance-environmental-and-other-factor-card';
import RailwayMaintenanceEnvironmentalAndOtherFactorDrawer from './railway-maintenance-environmental-and-other-factor-drawer';
import { railwayMaintenanceEnvironmentalAndOtherFactorColumns } from './railway-maintenance-environmental-and-other-factor-row';


interface RailwayMaintenanceEnvironmentalAndOtherFactorListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceEnvironmentalAndOtherFactorList: React.FC<RailwayMaintenanceEnvironmentalAndOtherFactorListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceEnvironmentalAndOtherFactor | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceEnvironmentalAndOtherFactor[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceEnvironmentalAndOtherFactor>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceEnvironmentalAndOtherFactor[]>({
    queryKey: ['railwayMaintenanceEnvironmentalAndOtherFactor'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceEnvironmentalAndOtherFactor);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceEnvironmentalAndOtherFactor);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceEnvironmentalAndOtherFactor) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceEnvironmentalAndOtherFactor>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceEnvironmentalAndOtherFactor) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };


  const mapRecordToDetailItems = (data: RailwayMaintenanceEnvironmentalAndOtherFactor): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-environmental-and-other-factor.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-environmental-and-other-factor.details.environmental-compliance-measures'),
      value: data?.environmental_compliance_measures || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-environmental-and-other-factor.details.noise-reduction-measures'),
      value: data?.noise_reduction_measures || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-environmental-and-other-factor.details.sustainable-design-features'),
      value: data?.sustainable_design_features || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-environmental-and-other-factor.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceEnvironmentalAndOtherFactorDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceEnvironmentalAndOtherFactor={selectedRow as RailwayMaintenanceEnvironmentalAndOtherFactor}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceEnvironmentalAndOtherFactor)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-environmental-and-other-factor.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-environmental-and-other-factor.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceEnvironmentalAndOtherFactorColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceEnvironmentalAndOtherFactorCard
            onDetail={handleClickDetail}
            railwayMaintenanceEnvironmentalAndOtherFactor={data as RailwayMaintenanceEnvironmentalAndOtherFactor}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR_FILE_TYPES}
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

export default RailwayMaintenanceEnvironmentalAndOtherFactorList;