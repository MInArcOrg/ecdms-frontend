// components/AreaTopographyMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { AreaTopography } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import AreaTopographyMasterCard from './area-topography-master-card';
import AreaTopographyMasterDrawer from './area-topography-master-drawer';
import areaTopographyMasterService from 'src/services/general/project/area-topography-master-service';

const AreaTopographyMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<AreaTopography | null>(null);
  const { t } = useTranslation();
  const fetchAreaTopographyMaster = (params: GetRequestParam): Promise<IApiResponse<AreaTopography[]>> => {
    return areaTopographyMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<AreaTopography[]>({
    queryKey: ['general-master', 'area-topographies'],
    fetchFunction: fetchAreaTopographyMaster
  });
  const handleDelete = async (id: string) => {
    await areaTopographyMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as AreaTopography);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: AreaTopography) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <AreaTopographyMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as AreaTopography}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.area-topographies`)}
            ItemViewComponent={({ data }) => (
              <AreaTopographyMasterCard generalMaster={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: `areatopography`
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

export default AreaTopographyMasterList;
