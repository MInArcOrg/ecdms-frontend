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
import { RailwayVehicleLoadAndCargoSpecification } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayVehicleLoadAndCargoSpecificationCard from './railway-vehicle-load-and-cargo-specification-card';
import RailwayVehicleLoadAndCargoSpecificationDrawer from './railway-vehicle-load-and-cargo-specification-drawer';
import { railwayVehicleLoadAndCargoSpecificationColumns } from './railway-vehicle-load-and-cargo-specification-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayVehicleLoadAndCargoSpecificationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleLoadAndCargoSpecificationList: React.FC<RailwayVehicleLoadAndCargoSpecificationListProps> = ({
  otherSubMenu,
  projectId
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayVehicleLoadAndCargoSpecification | null>(null);
  const { t } = useTranslation();

  const fetchLoadAndCargo = (params: GetRequestParam): Promise<IApiResponse<RailwayVehicleLoadAndCargoSpecification[]>> => {
    return projectOtherApiSecondService<RailwayVehicleLoadAndCargoSpecification>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: loadAndCargo,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayVehicleLoadAndCargoSpecification[]>({
    queryKey: ['railwayVehicleLoadAndCargoSpecification'],
    fetchFunction: fetchLoadAndCargo
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleLoadAndCargoSpecification);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleLoadAndCargoSpecification);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayVehicleLoadAndCargoSpecification) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleLoadAndCargoSpecification>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayVehicleLoadAndCargoSpecification) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapLoadAndCargoToDetailItems = (specs: RailwayVehicleLoadAndCargoSpecification): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-load-and-cargo-specification.details.railway_vehicle_identification_id'),
      value: specs?.railwayVehicleIndentification
        ? specs?.railwayVehicleIndentification +
          ' - ' +
          specs?.railwayVehicleIndentification.manufacturer_supplier_name +
          ' - ' +
          specs?.railwayVehicleIndentification.manufacture_year
        : specs?.railway_vehicle_identification_id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-load-and-cargo-specification.details.load_capacity_and_weight_limits'),
      value: specs?.load_capacity_and_weight_limits || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-load-and-cargo-specification.details.cargo_restrictions_or_special_requirements'),
      value: specs?.cargo_restrictions_or_special_requirements || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-load-and-cargo-specification.details.coupling_and_uncoupling_procedures'),
      value: specs?.coupling_and_uncoupling_procedures ? t('common.yes') : t('common.no')
    },
    {
      title: t('project.other.railway-vehicle-load-and-cargo-specification.details.remark'),
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
        <RailwayVehicleLoadAndCargoSpecificationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleLoadAndCargoSpecification={selectedRow as RailwayVehicleLoadAndCargoSpecification}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapLoadAndCargoToDetailItems(selectedRow as RailwayVehicleLoadAndCargoSpecification)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_VEHICLE_LOAD_AND_CARGO_SPECIFICATION'}
          title={t('project.other.railway-vehicle-load-and-cargo-specification.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-vehicle-load-and-cargo-specification.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleLoadAndCargoSpecificationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleLoadAndCargoSpecificationCard
            onDetail={handleClickDetail}
            railwayVehicleLoadAndCargoSpecification={data as RailwayVehicleLoadAndCargoSpecification}
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
            subject: 'railwayvehicleloadandcargospecification'
          }
        }}
        fetchDataFunction={refetch}
        items={loadAndCargo || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleLoadAndCargoSpecificationList;
