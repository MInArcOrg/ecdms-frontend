import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderVehicleApiService from 'src/services/stakeholder/stakeholder-vehicle-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import type { GetRequestParam, IApiResponse } from 'src/types/requests';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ItemsListing from 'src/views/shared/listing';
import OtherDetailSidebar from 'src/views/shared/layouts/other/other-detail-drawer';
import VehicleCard from './stakeholder-vehicle-card';
import VehicleDrawer from './stakeholder-vehicle-drawer';
import type { StakeholderVehicle } from 'src/types/stakeholder/stakeholder-vehicle';
import { vehicleColumns } from './stakeholder-vehicle-row';

interface StakeholderVehicleListProps {
  stakeholderId: string;
  typeId: string;
}

const StakeholderVehicleList: React.FC<StakeholderVehicleListProps> = ({ stakeholderId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<StakeholderVehicle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

  const fetchVehicles = (params: GetRequestParam): Promise<IApiResponse<StakeholderVehicle[]>> => {
    return stakeholderVehicleApiService.getAll({
      ...params,
      filter: { ...params.filter, stakeholder_id: stakeholderId }
    });
  };

  const {
    data: vehicles,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderVehicle[]>({
    queryKey: ['vehicles'],
    fetchFunction: fetchVehicles
  });

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderVehicle);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as StakeholderVehicle);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (vehicle: StakeholderVehicle) => {
    toggleDrawer();
    setSelectedRow(vehicle);
  };

  const handleDelete = async (vehicleId: string) => {
    await stakeholderVehicleApiService.delete(vehicleId);
    refetch();
  };

  const handleClickDetail = (vehicle: StakeholderVehicle) => {
    toggleDetailDrawer();
    setSelectedRow(vehicle);
  };

  const mapVehicleToDetailItems = (vehicle: StakeholderVehicle): { title: string; value: string }[] => [
    {
      title: t('stakeholder.stakeholder-vehicle.form.vehicle-name'),
      value: vehicle.vehicle_name || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.plate-number'),
      value: vehicle.plate_number || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.brand-name'),
      value: vehicle.brand_name || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.model'),
      value: vehicle.model || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.year'),
      value: vehicle.year?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.chassis-number'),
      value: vehicle.chassis_number || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.engine-number'),
      value: vehicle.engine_number || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.capacity'),
      value: vehicle.capacity || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.purpose'),
      value: vehicle.purpose || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.quantity'),
      value: vehicle.quantity?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.current-situation'),
      value: vehicle.current_situation || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.latitude'),
      value: vehicle.latitude?.toString() || 'N/A'
    },
    {
      title: t('stakeholder.stakeholder-vehicle.form.longitude'),
      value: vehicle.longitude?.toString() || 'N/A'
    },
    {
      title: t('common.table-columns.created-at'),
      value: vehicle?.created_at ? formatCreatedAt(vehicle.created_at) : 'N/A'
    }
  ];

  useEffect(() => {
    setIsLoading(false);
  }, []);



  return (
    <Box>
      {showDrawer && (
        <VehicleDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          vehicle={selectedRow as StakeholderVehicle}
          refetch={refetch}
          stakeholderId={stakeholderId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapVehicleToDetailItems(selectedRow as StakeholderVehicle)}
          id={selectedRow?.id || ''}
          hasReference={true}
          fileType="STAKEHOLDER_VEHICLE"
          title={t('stakeholder.stakeholder-vehicle.details')}
        />
      )}

      <ItemsListing
        title={t('stakeholder.stakeholder-vehicle.title')}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: vehicleColumns(handleClickDetail, handleEdit, handleDelete, t)
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <VehicleCard onDetail={handleClickDetail} vehicle={data} onEdit={handleEdit} refetch={refetch} onDelete={handleDelete} />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: 'create',
            subject: 'vehicle'
          }
        }}
        fetchDataFunction={refetch}
        items={vehicles || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default StakeholderVehicleList;
