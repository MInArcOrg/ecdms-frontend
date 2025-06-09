'use client';

import { Box } from '@mui/material';
import type React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import {
  RailwaySubBallastDrainageAndWaterManagement // Updated import to the new model
} from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ItemsListing from 'src/views/shared/listing';

// Renamed imports for related components (assuming these files will also be renamed and updated)
import RailwaySubBallastDrainageAndWaterManagementCard from './railway-sub-ballast-drainage-and-water-management-card';
import RailwaySubBallastDrainageAndWaterManagementDrawer from './railway-sub-ballast-drainage-and-water-management-drawer';
import { railwaySubBallastDrainageAndWaterManagementColumns } from './railway-sub-ballast-drainage-and-water-management-row';

interface RailwaySubBallastDrainageAndWaterManagementListProps { // Renamed interface
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastDrainageAndWaterManagementList: React.FC<RailwaySubBallastDrainageAndWaterManagementListProps> = ({ // Renamed component
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySubBallastDrainageAndWaterManagement | null>(null); // Updated state type
  const { t } = useTranslation();
  console.log('otherSubMenu?.apiRoute', otherSubMenu?.apiRoute)
  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwaySubBallastDrainageAndWaterManagement[]>> => { // Updated generic type
    return projectOtherApiSecondService<RailwaySubBallastDrainageAndWaterManagement>().getAll(otherSubMenu?.apiRoute || '', { // Updated generic type
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwaySubBallastDrainageAndWaterManagement[]>({ // Updated generic type
    queryKey: ['railwaySubBallastDrainageAndWaterManagements', projectId], // Updated query key
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySubBallastDrainageAndWaterManagement); // Updated type
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySubBallastDrainageAndWaterManagement); // Updated type
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwaySubBallastDrainageAndWaterManagement) => { // Updated type
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastDrainageAndWaterManagement>().delete(otherSubMenu?.apiRoute || '', id); // Updated generic type
    refetch();
  };

  const handleClickDetail = (row: RailwaySubBallastDrainageAndWaterManagement) => { // Updated type
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  // Updated mapToDetailItems to reflect the new model's fields and translation keys
  const mapToDetailItems = (row: RailwaySubBallastDrainageAndWaterManagement): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: row?.id || 'N/A' // Assuming 'id' is for the record itself
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.project_id', 'Project ID'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.railway_line_section_name', 'Railway Line Section Name'),
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_condition_assessment', 'Drainage Condition Assessment'),
      value: row?.drainage_condition_assessment || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_type', 'Drainage Infrastructure Type'),
      value: row?.drainage_infrastructure_type || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.water_management_measures', 'Water Management Measures'),
      value: row?.water_management_measures || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_length', 'Drainage Infrastructure Length'),
      value: row?.drainage_infrastructure_length?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-drainage-and-water-management.details.remark', 'Remark'),
      value: row?.remark || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: row?.updated_at ? formatCreatedAt(row.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySubBallastDrainageAndWaterManagementDrawer // Renamed Drawer component
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySubBallastDrainageAndWaterManagement={selectedRow as RailwaySubBallastDrainageAndWaterManagement} // Updated prop name and type
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwaySubBallastDrainageAndWaterManagement)} // Updated type
          hasReference={false}
          id={selectedRow?.id || ''} // Using row.id for detail drawer ID
          fileType=""
          title={t('project.other.railway-sub-ballast-drainage-and-water-management.detail', 'Sub Ballast Drainage And Water Management Details')} // Updated translation key and default
        />
      )}

      <ItemsListing
        title={t('project.other.railway-sub-ballast-drainage-and-water-management.title', 'Sub Ballast Drainage And Water Management Records')} // Updated translation key and default
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySubBallastDrainageAndWaterManagementColumns(handleClickDetail, handleEdit, handleDelete, t, refetch) // Updated columns function import and call
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data: itemData }) => ( // Renamed `data` to `itemData` for clarity
          <RailwaySubBallastDrainageAndWaterManagementCard // Renamed Card component
            onDetail={handleClickDetail}
            railwaySubBallastDrainageAndWaterManagement={itemData as RailwaySubBallastDrainageAndWaterManagement} // Updated prop name and type
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: 'create',
            subject: 'railwaysubballastdrainageandwatermanagement' // Updated subject
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySubBallastDrainageAndWaterManagementList; // Renamed export