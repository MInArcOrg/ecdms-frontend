// components/MaintenanceFrequencyMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { MaintenanceFrequency } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import MaintenanceFrequencyMasterCard from './maintenance-frequency-master-card';
import MaintenanceFrequencyMasterDrawer from './maintenance-frequency-master-drawer';
import maintenanceFrequencyMasterService from 'src/services/general/project/maintenance-frequency-master-service';

const MaintenanceFrequencyMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<MaintenanceFrequency | null>(null);
  const { t } = useTranslation();
  const fetchMaintenanceFrequencyMaster = (params: GetRequestParam): Promise<IApiResponse<MaintenanceFrequency[]>> => {
    return maintenanceFrequencyMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MaintenanceFrequency[]>({
    queryKey: ['general-master', 'maintenance-frequencies'],
    fetchFunction: fetchMaintenanceFrequencyMaster
  });
  const handleDelete = async (id: string) => {
    await maintenanceFrequencyMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as MaintenanceFrequency);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: MaintenanceFrequency) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <MaintenanceFrequencyMasterDrawer open={showDrawer} toggle={toggleDrawer} masterData={selectedRow as MaintenanceFrequency} refetch={refetch} />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.maintenance-frequencies`)}
            ItemViewComponent={({ data }) => (
              <MaintenanceFrequencyMasterCard generalMaster={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: `maintenancefrequency`
              }
            }}
            fetchDataFunction={refetch}
            items={types || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default MaintenanceFrequencyMasterList;
