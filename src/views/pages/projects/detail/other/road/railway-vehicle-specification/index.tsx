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
import { RailwayVehicleSpecification } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayVehicleSpecificationCard from './railway-vehicle-specification-card';
import RailwayVehicleSpecificationDrawer from './railway-vehicle-specification-drawer';
import { railwayVehicleSpecificationColumns } from './railway-vehicle-specification-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayVehicleSpecificationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleSpecificationList: React.FC<RailwayVehicleSpecificationListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayVehicleSpecification | null>(null);
  const { t } = useTranslation();

  const fetchVehicleSpecification = (params: GetRequestParam): Promise<IApiResponse<RailwayVehicleSpecification[]>> => {
    return projectOtherApiSecondService<RailwayVehicleSpecification>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: vehicleSpecification,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayVehicleSpecification[]>({
    queryKey: ['railwayVehicleSpecification'],
    fetchFunction: fetchVehicleSpecification
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleSpecification);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleSpecification);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayVehicleSpecification) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleSpecification>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayVehicleSpecification) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapVehicleSpecificationToDetailItems = (specs: RailwayVehicleSpecification): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.railway_vehicle_identification_id'),
      value: specs?.railwayVehicleIdentification?.vehicle_identification_number || specs?.railway_vehicle_identification_id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.vehicle_dimensions'),
      value: specs?.vehicle_dimensions || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.vehicle_weight_and_load_capacity'),
      value: specs?.vehicle_weight_and_load_capacity || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.maximum_speed'),
      value: specs?.maximum_speed?.toString() || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.braking_system_type'),
      value: specs?.brakingSystemType?.title || specs?.braking_system_type_id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-specification.details.remark'),
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
        <RailwayVehicleSpecificationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleSpecification={selectedRow as RailwayVehicleSpecification}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapVehicleSpecificationToDetailItems(selectedRow as RailwayVehicleSpecification)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_VEHICLE_SPECIFICATION'}
          title={t('project.other.railway-vehicle-specification.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-vehicle-specification.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleSpecificationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleSpecificationCard
            onDetail={handleClickDetail}
            railwayVehicleSpecification={data as RailwayVehicleSpecification}
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
            subject: 'railwayvehiclespecification'
          }
        }}
        fetchDataFunction={refetch}
        items={vehicleSpecification || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleSpecificationList;
