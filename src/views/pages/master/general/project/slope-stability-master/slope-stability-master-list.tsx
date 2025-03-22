// components/SlopeStabilityMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { SlopeStability } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import SlopeStabilityMasterCard from './slope-stability-master-card';
import SlopeStabilityMasterDrawer from './slope-stability-master-drawer';
import slopeStabilityMasterService from 'src/services/general/project/slope-stability-master-service';

const SlopeStabilityMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SlopeStability | null>(null);
  const { t } = useTranslation();
  const fetchSlopeStabilityMaster = (params: GetRequestParam): Promise<IApiResponse<SlopeStability[]>> => {
    return slopeStabilityMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SlopeStability[]>({
    queryKey: ['general-master', 'slope-stabilities'],
    fetchFunction: fetchSlopeStabilityMaster
  });
  const handleDelete = async (id: string) => {
    await slopeStabilityMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as SlopeStability);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: SlopeStability) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <SlopeStabilityMasterDrawer open={showDrawer} toggle={toggleDrawer} masterData={selectedRow as SlopeStability} refetch={refetch} />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.slope-stabilities`)}
            ItemViewComponent={({ data }) => (
              <SlopeStabilityMasterCard generalMaster={data} onDelete={handleDelete} onEdit={handleEdit} t={t} refetch={refetch} />
            )}
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: `slopestability`
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

export default SlopeStabilityMasterList;
