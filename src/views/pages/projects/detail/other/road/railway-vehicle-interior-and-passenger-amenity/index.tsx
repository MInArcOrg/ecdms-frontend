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
import { RailwayVehicleInteriorAndPassengerAmenity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayVehicleInteriorAndPassengerAmenityCard from './railway-vehicle-interior-and-passenger-amenity-card';
import RailwayVehicleInteriorAndPassengerAmenityDrawer from './railway-vehicle-interior-and-passenger-amenity-drawer';
import { railwayVehicleInteriorAndPassengerAmenityColumns } from './railway-vehicle-interior-and-passenger-amenity-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayVehicleInteriorAndPassengerAmenityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleInteriorAndPassengerAmenityList: React.FC<RailwayVehicleInteriorAndPassengerAmenityListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayVehicleInteriorAndPassengerAmenity | null>(null);
  const { t } = useTranslation();

  const fetchInteriorAndAmenity = (params: GetRequestParam): Promise<IApiResponse<RailwayVehicleInteriorAndPassengerAmenity[]>> => {
    return projectOtherApiSecondService<RailwayVehicleInteriorAndPassengerAmenity>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: interiorAndAmenity,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayVehicleInteriorAndPassengerAmenity[]>({
    queryKey: ['railwayVehicleInteriorAndPassengerAmenity'],
    fetchFunction: fetchInteriorAndAmenity
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleInteriorAndPassengerAmenity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleInteriorAndPassengerAmenity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayVehicleInteriorAndPassengerAmenity) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleInteriorAndPassengerAmenity>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayVehicleInteriorAndPassengerAmenity) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapInteriorAndAmenityToDetailItems = (specs: RailwayVehicleInteriorAndPassengerAmenity): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.railway_vehicle_identification_id'),
      value: specs?.railwayVehicleIdentification
        ? specs?.railwayVehicleIdentification +
        ' - ' +
        specs?.railwayVehicleIdentification.manufacturer_supplier_name +
        ' - ' +
        specs?.railwayVehicleIdentification.manufacture_year
        : specs?.railway_vehicle_identification_id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.seating_capacity'),
      value: specs?.seating_capacity?.toString() || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.passenger_amenities_availability'),
      value: specs?.passenger_amenities_availability || 'N/A'
    },
    {
      title: t(
        'project.other.railway-vehicle-interior-and-passenger-amenity.details.accessibility_features_for_passengers_with_disabilities'
      ),
      value: specs?.accessibility_features_for_passengers_with_disabilities ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.remark'),
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
        <RailwayVehicleInteriorAndPassengerAmenityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleInteriorAndPassengerAmenity={selectedRow as RailwayVehicleInteriorAndPassengerAmenity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapInteriorAndAmenityToDetailItems(selectedRow as RailwayVehicleInteriorAndPassengerAmenity)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_VEHICLE_INTERIOR_AND_PASSENGER_AMENITY'}
          title={t('project.other.railway-vehicle-interior-and-passenger-amenity.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-vehicle-interior-and-passenger-amenity.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleInteriorAndPassengerAmenityColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleInteriorAndPassengerAmenityCard
            onDetail={handleClickDetail}
            railwayVehicleInteriorAndPassengerAmenity={data as RailwayVehicleInteriorAndPassengerAmenity}
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
            subject: 'railwayvehicleinteriorandpassengeramenity'
          }
        }}
        fetchDataFunction={refetch}
        items={interiorAndAmenity || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleInteriorAndPassengerAmenityList;
