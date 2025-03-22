// components/DrainageTypeMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DrainageType } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import DrainageTypeMasterCard from './drainage-type-master-card';
import DrainageTypeMasterDrawer from './drainage-type-master-drawer';
import drainageTypeMasterService from 'src/services/general/project/drainage-type-master-service';

const DrainageTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DrainageType | null>(null);
  const { t } = useTranslation();
  const fetchDrainageTypeMaster = (params: GetRequestParam): Promise<IApiResponse<DrainageType[]>> => {
    return drainageTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DrainageType[]>({
    queryKey: ['general-master', 'drainage-type'],
    fetchFunction: fetchDrainageTypeMaster
  });
  const handleDelete = async (id: string) => {
    await drainageTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as DrainageType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: DrainageType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <DrainageTypeMasterDrawer open={showDrawer} toggle={toggleDrawer} masterData={selectedRow as DrainageType} refetch={refetch} />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.drainage-types`)}
            ItemViewComponent={({ data }) => (
              <DrainageTypeMasterCard
                type={'drainage-type'}
                generalMaster={data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                t={t}
                refetch={refetch}
              />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: `hydrologydefect`
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

export default DrainageTypeMasterList;
