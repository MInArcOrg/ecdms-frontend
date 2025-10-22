// src/views/project/other/railway-maintenance-facility-layout-and-design/railway-maintenance-facility-layout-and-design-list.tsx

'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

// Configuration Imports
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import {
  RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES,
  RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_ENTITY_SUBJECT
} from './file-type-config';

// Hook and Service Imports
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { RailwayMaintenanceFacilityLayoutAndDesign } from 'src/types/project/other'; // Model from types file

// Utility Imports
import { formatCreatedAt } from 'src/utils/formatter/date';

// Component Imports
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import FileDrawer from 'src/views/components/custom/files-drawer';
import RailwayMaintenanceFacilityLayoutAndDesignCard from './railway-maintenance-facility-layout-and-design-card';
import RailwayMaintenanceFacilityLayoutAndDesignDrawer from './railway-maintenance-facility-layout-and-design-drawer';
import { railwayMaintenanceFacilityLayoutAndDesignColumns } from './railway-maintenance-facility-layout-and-design-row';


interface RailwayMaintenanceFacilityLayoutAndDesignListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  projectId: string;
  typeId?: string
}

const RailwayMaintenanceFacilityLayoutAndDesignList: React.FC<RailwayMaintenanceFacilityLayoutAndDesignListProps> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayMaintenanceFacilityLayoutAndDesign | null>(null);
  const { t } = useTranslation();

  // Use config constant
  const entitySubject = RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_ENTITY_SUBJECT;
  const FILE_TYPE_DEFAULT = RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES[0].type;


  const fetchRecord = (params: GetRequestParam): Promise<IApiResponse<RailwayMaintenanceFacilityLayoutAndDesign[]>> => {
    return projectOtherApiSecondService<RailwayMaintenanceFacilityLayoutAndDesign>().getAll(otherSubMenu?.apiRoute || '', {
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
  } = usePaginatedFetch<RailwayMaintenanceFacilityLayoutAndDesign[]>({
    queryKey: ['railwayMaintenanceFacilityLayoutAndDesign'],
    fetchFunction: fetchRecord
  });


  const toggleDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityLayoutAndDesign);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayMaintenanceFacilityLayoutAndDesign);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (data: RailwayMaintenanceFacilityLayoutAndDesign) => {
    setShowDrawer(true);
    setSelectedRow(data);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayMaintenanceFacilityLayoutAndDesign>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (data: RailwayMaintenanceFacilityLayoutAndDesign) => {
    setShowDetailDrawer(true); // Open detail drawer first
    setSelectedRow(data);
  };

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));


  const mapRecordToDetailItems = (data: RailwayMaintenanceFacilityLayoutAndDesign): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: data?.id || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.facility-name'),
      value: data?.facility_name || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.facility-layout-and-dimension'),
      value: data?.facility_layout_and_dimension || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.maintenance-bays-number-and-size'),
      value: data?.maintenance_bays_number_and_size || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.spare-parts-and-equipment-storage-areas'),
      value: data?.spare_parts_and_equipment_storage_areas || 'N/A'
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.office-and-administrative-areas-availability'),
      value: booleanToText(data?.office_and_administrative_areas_availability)
    },
    {
      title: t('project.other.railway-maintenance-facility-layout-and-design.details.remark'),
      value: data?.remark || 'N/A'
    },
    ...RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES.map(type => ({
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
        <RailwayMaintenanceFacilityLayoutAndDesignDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayMaintenanceFacilityLayoutAndDesign={selectedRow as RailwayMaintenanceFacilityLayoutAndDesign}
          refetch={refetch}
          projectId={projectId}
          fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRecordToDetailItems(selectedRow as RailwayMaintenanceFacilityLayoutAndDesign)}
          hasReference={false}
          id={selectedRow?.id || ''}
          fileType={otherSubMenu?.fileType || FILE_TYPE_DEFAULT}
          title={t('project.other.railway-maintenance-facility-layout-and-design.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-maintenance-facility-layout-and-design.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayMaintenanceFacilityLayoutAndDesignColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
            RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES
          )
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayMaintenanceFacilityLayoutAndDesignCard
            onDetail={handleClickDetail}
            railwayMaintenanceFacilityLayoutAndDesign={data as RailwayMaintenanceFacilityLayoutAndDesign}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
            fileTypesConfig={RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN_FILE_TYPES}
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

export default RailwayMaintenanceFacilityLayoutAndDesignList;