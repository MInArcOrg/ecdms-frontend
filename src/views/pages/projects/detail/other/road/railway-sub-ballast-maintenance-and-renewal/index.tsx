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
  RailwaySubBallastMaintenanceAndRenewal // Updated import to the new model
} from 'src/types/project/other';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import ItemsListing from 'src/views/shared/listing';

// Renamed imports for related components (assuming these files will also be renamed and updated)
import RailwaySubBallastMaintenanceAndRenewalCard from './railway-sub-ballast-maintenance-and-renewal-card';
import RailwaySubBallastMaintenanceAndRenewalDrawer from './railway-sub-ballast-maintenance-and-renewal-drawer';
import { railwaySubBallastMaintenanceAndRenewalColumns } from './railway-sub-ballast-maintenance-and-renewal-row';

interface RailwaySubBallastMaintenanceAndRenewalListProps {
  // Renamed interface
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySubBallastMaintenanceAndRenewalList: React.FC<RailwaySubBallastMaintenanceAndRenewalListProps> = ({
  // Renamed component
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwaySubBallastMaintenanceAndRenewal | null>(null); // Updated state type
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwaySubBallastMaintenanceAndRenewal[]>> => {
    // Updated generic type
    return projectOtherApiSecondService<RailwaySubBallastMaintenanceAndRenewal>().getAll(otherSubMenu?.apiRoute || '', {
      // Updated generic type
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const { data, isLoading, pagination, handlePageChange, refetch } = usePaginatedFetch<RailwaySubBallastMaintenanceAndRenewal[]>({
    // Updated generic type
    queryKey: ['railwaySubBallastMaintenanceAndRenewals', projectId], // Updated query key to be more specific
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySubBallastMaintenanceAndRenewal); // Updated type
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySubBallastMaintenanceAndRenewal); // Updated type
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwaySubBallastMaintenanceAndRenewal) => {
    // Updated type
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySubBallastMaintenanceAndRenewal>().delete(otherSubMenu?.apiRoute || '', id); // Updated generic type
    refetch();
  };

  const handleClickDetail = (row: RailwaySubBallastMaintenanceAndRenewal) => {
    // Updated type
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  // Updated mapToDetailItems to reflect the new model's fields and translation keys
  const mapToDetailItems = (row: RailwaySubBallastMaintenanceAndRenewal): { title: string; value: string }[] => [
    {
      title: t('common.table-columns.id'),
      value: row?.id || 'N/A' // Assuming 'id' is for the record itself
    },
    {
      title: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.project_id', 'Project ID'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.railway_line_section_name', 'Railway Line Section Name'),
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t(
        'project.other.railway-sub-ballast-maintenance-and-renewal.details.scheduled_maintenance_activities',
        'Scheduled Maintenance Activities'
      ),
      value: row?.scheduled_maintenance_activities || 'N/A'
    },
    {
      title: t(
        'project.other.railway-sub-ballast-maintenance-and-renewal.details.sub_ballast_renewal_history',
        'Sub-Ballast Renewal History'
      ),
      value: row?.sub_ballast_renewal_history || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.recent_maintenance_dates', 'Recent Maintenance Dates'),
      value: row?.recent_maintenance_dates ? formatDynamicDate(row.recent_maintenance_dates) : 'N/A'
    },
    {
      title: t(
        'project.other.railway-sub-ballast-maintenance-and-renewal.details.inspection_reports_findings',
        'Inspection Reports Findings'
      ),
      value: row?.inspection_reports_findings || 'N/A'
    },
    {
      title: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.remark', 'Remark'),
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
        <RailwaySubBallastMaintenanceAndRenewalDrawer // Renamed Drawer component
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySubBallastMaintenanceAndRenewal={selectedRow as RailwaySubBallastMaintenanceAndRenewal} // Updated prop name and type
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwaySubBallastMaintenanceAndRenewal)} // Updated type
          hasReference={false}
          id={selectedRow?.id || ''} // Using row.id for detail drawer ID
          fileType=""
          title={t('project.other.railway-sub-ballast-maintenance-and-renewal.detail', 'Sub Ballast Maintenance And Renewal Details')} // Updated translation key and default
        />
      )}

      <ItemsListing
        title={t('project.other.railway-sub-ballast-maintenance-and-renewal.title', 'Sub Ballast Maintenance And Renewal Records')} // Updated translation key and default
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySubBallastMaintenanceAndRenewalColumns(handleClickDetail, handleEdit, handleDelete, t, refetch) // Updated columns function import and call
        }}
        isLoading={isLoading}
        ItemViewComponent={(
          { data: itemData } // Renamed `data` to `itemData` for clarity
        ) => (
          <RailwaySubBallastMaintenanceAndRenewalCard // Renamed Card component
            onDetail={handleClickDetail}
            railwaySubBallastMaintenanceAndRenewal={itemData as RailwaySubBallastMaintenanceAndRenewal} // Updated prop name and type
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
            subject: 'railwaysubballastmaintenanceandrenewal' // Updated subject
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySubBallastMaintenanceAndRenewalList; // Renamed export
