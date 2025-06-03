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
import RailwayBallastMaintenanceAndRenewalCard from './railway-ballast-maintenance-and-renewal-card'; // Updated import
import RailwayBallastMaintenanceAndRenewalDrawer from './railway-ballast-maintenance-and-renewal-drawer'; // Updated import
import { RailwayBallastMaintenanceAndRenewal } from 'src/types/project/other'; // Updated type import
import { formatCreatedAt } from 'src/utils/formatter/date';
import { railwayBallastMaintenanceAndRenewalColumns } from './railway-ballast-maintenance-and-renewal-row'; // Updated import

interface RailwayBallastMaintenanceAndRenewalListProps {
  // Renamed interface
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayBallastMaintenanceAndRenewalList: React.FC<RailwayBallastMaintenanceAndRenewalListProps> = ({
  // Renamed component
  otherSubMenu,
  projectId,
  typeId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayBallastMaintenanceAndRenewal | null>(null); // Updated type
  const { t } = useTranslation();

  const fetchData = (params: GetRequestParam): Promise<IApiResponse<RailwayBallastMaintenanceAndRenewal[]>> => {
    // Updated type
    return projectOtherApiSecondService<RailwayBallastMaintenanceAndRenewal>().getAll(otherSubMenu?.apiRoute || '', {
      // Updated type
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const { data, isLoading, pagination, handlePageChange, refetch } = usePaginatedFetch<RailwayBallastMaintenanceAndRenewal[]>({
    // Updated type
    queryKey: ['railwayBallastMaintenanceAndRenewals'], // Updated queryKey
    fetchFunction: fetchData
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayBallastMaintenanceAndRenewal); // Updated type
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayBallastMaintenanceAndRenewal); // Updated type
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (row: RailwayBallastMaintenanceAndRenewal) => {
    // Updated type
    setSelectedRow(row);
    setShowDrawer(true);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayBallastMaintenanceAndRenewal>().delete(otherSubMenu?.apiRoute || '', id); // Updated type
    refetch();
  };

  const handleClickDetail = (row: RailwayBallastMaintenanceAndRenewal) => {
    // Updated type
    setSelectedRow(row);
    setShowDetailDrawer(true);
  };

  const mapToDetailItems = (row: RailwayBallastMaintenanceAndRenewal): { title: string; value: string }[] => [
    // Updated type
    {
      title: t('common.table-columns.id'),
      value: row?.project_id || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-maintenance-and-renewal.details.railway-line-section-name'), // Updated translation key
      value: row?.railway_line_section_name || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-maintenance-and-renewal.details.scheduled-maintenance-activities'), // New field
      value: row?.scheduled_maintenance_activities || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-maintenance-and-renewal.details.recent-maintenance-dates'), // New field
      value: row?.recent_maintenance_dates ? formatCreatedAt(row.recent_maintenance_dates) : 'N/A'
    },
    {
      title: t('project.other.railway-ballast-maintenance-and-renewal.details.inspection-reports-findings'), // New field
      value: row?.inspection_reports_findings || 'N/A'
    },
    {
      title: t('project.other.railway-ballast-maintenance-and-renewal.details.remark'), // Updated translation key
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
        <RailwayBallastMaintenanceAndRenewalDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayBallastMaintenanceAndRenewal={selectedRow as RailwayBallastMaintenanceAndRenewal}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapToDetailItems(selectedRow as RailwayBallastMaintenanceAndRenewal)}
          hasReference={false}
          id={selectedRow?.project_id || ''}
          fileType=""
          title={t('project.other.railway-ballast-maintenance-and-renewal.detail')}
        />
      )}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayBallastMaintenanceAndRenewalColumns(handleClickDetail, handleEdit, handleDelete, t, refetch)
        }}
        title="project.other.railway-ballast-maintenance-and-renewal.title"
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayBallastMaintenanceAndRenewalCard
            onDetail={handleClickDetail}
            railwayBallastMaintenanceAndRenewal={data}
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
            subject: 'railwayballastmaintenanceandrenewal'
          }
        }}
        fetchDataFunction={refetch}
        items={data || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayBallastMaintenanceAndRenewalList;
