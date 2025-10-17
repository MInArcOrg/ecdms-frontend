'use client';

import type React from 'react';
import { Box } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import projectOtherApiSecondService from 'src/services/project/project-other-second-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import RailwayBallastDrainageAndWaterManagementCard from './railway-ballast-drainage-and-water-management-card'; // Updated import
import RailwayBallastDrainageAndWaterManagementDrawer from './railway-ballast-drainage-and-water-management-drawer'; // Updated import
import { RailwayBallastDrainageAndWaterManagement } from 'src/types/project/other'; // Updated type import
import { formatCreatedAt } from 'src/utils/formatter/date';
import { railwayBallastDrainageAndWaterManagementColumns } from './railway-ballast-drainage-and-water-management-row'; // Updated import

interface RailwayBallastDrainageAndWaterManagementListProps {
  // Renamed interface
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastDrainageAndWaterManagementList: React.FC<RailwayBallastDrainageAndWaterManagementListProps> = ({
  // Renamed component
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayBallastDrainageAndWaterManagement | null>(null); // Updated type
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwayBallastDrainageAndWaterManagement[]>> => {
    // Updated type
    return projectOtherApiSecondService<RailwayBallastDrainageAndWaterManagement>().getAll(otherSubMenu?.apiRoute || '', {
      // Updated type
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const { data, isLoading, pagination, handlePageChange, refetch } = usePaginatedFetch<RailwayBallastDrainageAndWaterManagement[]>({
    // Updated type
    queryKey: ['railwayBallastDrainageAndWaterManagements'], // Updated queryKey
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastDrainageAndWaterManagement); // Updated type
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastDrainageAndWaterManagement); // Updated type
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayBallastDrainageAndWaterManagement) => {
    // Updated type
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastDrainageAndWaterManagement>().delete(otherSubMenu?.apiRoute || '', id); // Updated type
    refetch();
  };

  const handleClickDetail = (row: RailwayBallastDrainageAndWaterManagement) => {
    // Updated type
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (row: RailwayBallastDrainageAndWaterManagement): { title: string; value: string }[] => [
    // Updated type
    {
      title: t('common.table-columns.id'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.railway-line-section-name'), // Updated translation key
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-condition-assessment'), // New field based on model
      value: row?.drainage_condition_assessment || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-type'), // New field based on model
      value: row?.drainage_infrastructure_type || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.water-management-measures'), // New field based on model
      value: row?.water_management_measures || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-length'), // New field based on model
      value: row?.drainage_infrastructure_length?.toLocaleString() ?? 'N/A'
    },
    {
      title: t('project.other.railway-ballast-drainage-and-water-management.details.remark'), // Updated translation key
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
        <RailwayBallastDrainageAndWaterManagementDrawer // Updated component name
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastDrainageAndWaterManagement={selectedRow as RailwayBallastDrainageAndWaterManagement} // Updated prop name and type
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwayBallastDrainageAndWaterManagement)} // Updated type
          hasReference={false}
          id={selectedRow?.project_id || ''}
          fileType=""
          title={t('project.other.railway-ballast-drainage-and-water-management.detail')} // Updated translation key
        />
      )}

      <ItemsListing
        title={t('project.other.railway-ballast-drainage-and-water-management.title')} // Updated translation key
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastDrainageAndWaterManagementColumns(handleClickDetail, handleEdit, handleDelete, t, refetch) // Updated function name
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastDrainageAndWaterManagementCard // Updated component name
            onDetail={handleClickDetail}
            railwayBallastDrainageAndWaterManagement={data} // Updated prop name
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwayballastdrainageandwatermanagement' // Updated subject
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastDrainageAndWaterManagementList; // Updated export name
