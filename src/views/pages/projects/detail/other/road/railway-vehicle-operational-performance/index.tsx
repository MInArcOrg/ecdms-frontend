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
import { RailwayVehicleOperationalPerformance } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayVehicleOperationalPerformanceCard from './railway-vehicle-operational-performance-card';
import RailwayVehicleOperationalPerformanceDrawer from './railway-vehicle-operational-performance-drawer';
import { railwayVehicleOperationalPerformanceColumns } from './railway-vehicle-operational-performance-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayVehicleOperationalPerformanceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleOperationalPerformanceList: React.FC<RailwayVehicleOperationalPerformanceListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayVehicleOperationalPerformance | null>(null);
  const { t } = useTranslation();

  const fetchOperationalPerformance = (params: GetRequestParam): Promise<IApiResponse<RailwayVehicleOperationalPerformance[]>> => {
    return projectOtherApiSecondService<RailwayVehicleOperationalPerformance>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: operationalPerformance,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayVehicleOperationalPerformance[]>({
    queryKey: ['railwayVehicleOperationalPerformance'],
    fetchFunction: fetchOperationalPerformance
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleOperationalPerformance);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleOperationalPerformance);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayVehicleOperationalPerformance) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleOperationalPerformance>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayVehicleOperationalPerformance) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapOperationalPerformanceToDetailItems = (specs: RailwayVehicleOperationalPerformance): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.railway_vehicle_identification_id'),
      value: specs?.railwayVehicleIndentification
        ? specs?.railwayVehicleIndentification +
          ' - ' +
          specs?.railwayVehicleIndentification.manufacturer_supplier_name +
          ' - ' +
          specs?.railwayVehicleIndentification.manufacture_year
        : specs?.railway_vehicle_identification_id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.fuel_or_energy_consumption'),
      value: specs?.fuel_or_energy_consumption || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.mileage_or_operating_hours'),
      value: specs?.mileage_or_operating_hours || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.reliability_and_availability'),
      value: specs?.reliability_and_availability || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.performance_indicators'),
      value: specs?.performance_indicators || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-operational-performance.details.remark'),
      value: specs?.remark || 'N/A'
    },
    {
      title: t('common.form.attachments'),
      value: <FileDrawer id={specs.id} type={otherSubMenu?.fileType || ''} />
    },
    {
      title: t('common.table-columns.created-at'),
      value: specs?.created_at ? formatCreatedAt(specs.created_at) : 'N/A'
    },
    {
      title: t('common.table-columns.updated-at'),
      value: specs?.updated_at ? formatCreatedAt(specs.updated_at) : 'N/A'
    }
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayVehicleOperationalPerformanceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleOperationalPerformance={selectedRow as RailwayVehicleOperationalPerformance}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapOperationalPerformanceToDetailItems(selectedRow as RailwayVehicleOperationalPerformance)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_VEHICLE_OPERATIONAL_PERFORMANCE'}
          title={t('project.other.railway-vehicle-operational-performance.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-vehicle-operational-performance.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleOperationalPerformanceColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleOperationalPerformanceCard
            onDetail={handleClickDetail}
            railwayVehicleOperationalPerformance={data as RailwayVehicleOperationalPerformance}
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'railwayvehicleoperationalperformance'
          }
        }}
        fetchDataFunction={refetch}
        items={operationalPerformance || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleOperationalPerformanceList;
