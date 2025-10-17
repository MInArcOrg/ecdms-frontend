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
import { RailwayVehicleIdentification } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RailwayVehicleIdentificationCard from './railway-vehicle-identification-card';
import RailwayVehicleIdentificationDrawer from './railway-vehicle-identification-drawer';
import { railwayVehicleIdentificationColumns } from './railway-vehicle-identification-row';
import FileDrawer from 'src/views/components/custom/files-drawer';

interface RailwayVehicleIdentificationListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayVehicleIdentificationList: React.FC<RailwayVehicleIdentificationListProps> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<RailwayVehicleIdentification | null>(null);
  const { t } = useTranslation();

  const fetchVehicleIdentification = (params: GetRequestParam): Promise<IApiResponse<RailwayVehicleIdentification[]>> => {
    return projectOtherApiSecondService<RailwayVehicleIdentification>().getAll(otherSubMenu?.apiRoute || '', {
      ...params,
      filter: { ...params.filter, project_id: projectId }
    });
  };

  const {
    data: vehicleIdentification,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<RailwayVehicleIdentification[]>({
    queryKey: ['railwayVehicleIdentification'],
    fetchFunction: fetchVehicleIdentification
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayVehicleIdentification);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayVehicleIdentification);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (specs: RailwayVehicleIdentification) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayVehicleIdentification>().delete(otherSubMenu?.apiRoute || '', id);
    refetch();
  };

  const handleClickDetail = (specs: RailwayVehicleIdentification) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapVehicleIdentificationToDetailItems = (specs: RailwayVehicleIdentification): { title: string; value: any }[] => [
    {
      title: t('common.table-columns.id'),
      value: specs?.id || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.vehicle_identification_number'),
      value: specs?.vehicle_identification_number || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.vehicle_type'),
      value: specs?.vehicle_type || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.manufacturer_supplier_name'),
      value: specs?.manufacturer_supplier_name || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.manufacturer_supplier_address'),
      value: specs?.manufacturer_supplier_address || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.manufacture_year'),
      value: specs?.manufacture_year?.toString() || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.ownership_or_leasing_details'),
      value: specs?.ownership_or_leasing_details || 'N/A'
    },
    {
      title: t('project.other.railway-vehicle-identification.details.remark'),
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
        <RailwayVehicleIdentificationDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayVehicleIdentification={selectedRow as RailwayVehicleIdentification}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapVehicleIdentificationToDetailItems(selectedRow as RailwayVehicleIdentification)}
          hasReference={true}
          id={selectedRow?.id || ''}
          fileType={'RAILWAY_VEHICLE_IDENTIFICATION'}
          title={t('project.other.railway-vehicle-identification.detail')}
        />
      )}

      <ItemsListing
        title={t('project.other.railway-vehicle-identification.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayVehicleIdentificationColumns(handleClickDetail, handleEdit, handleDelete, t, refetch, otherSubMenu)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayVehicleIdentificationCard
            onDetail={handleClickDetail}
            railwayVehicleIdentification={data as RailwayVehicleIdentification}
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
            subject: 'railwayvehicleidentification'
          }
        }}
        fetchDataFunction={refetch}
        items={vehicleIdentification || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayVehicleIdentificationList;
