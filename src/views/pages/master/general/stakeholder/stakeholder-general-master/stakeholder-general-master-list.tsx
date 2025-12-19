// components/StakeholderGeneralMaster.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import { StakeholderMasterModel } from 'src/constants/master-data/stakeholder-general-master-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import stakeholderGeneralMasterDataApiService from 'src/services/general/stakeholder-general-master-data-service';
import { StakeholderGeneralMaster } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import StakeholderGeneralMasterCard from './stakeholder-general-master-card';
import StakeholderGeneralMasterDrawer from './stakeholder-general-master-drawer';

interface StakeholderGeneralMasterProps {
  stakeholderMasterModel: StakeholderMasterModel;
}

const StakeholderGeneralMasterList: React.FC<StakeholderGeneralMasterProps> = ({ stakeholderMasterModel }) => {
  const [selectedRow, setSelectedRow] = useState<StakeholderGeneralMaster | null>(null);
  const { t } = useTranslation();
  const fetchStakeholderGeneralMaster = (params: GetRequestParam): Promise<IApiResponse<StakeholderGeneralMaster[]>> => {
    return stakeholderGeneralMasterDataApiService.getAll({
      ...params,
      filter: { ...params.filter, model: stakeholderMasterModel.model }
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: stakeholderGeneralMasters,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<StakeholderGeneralMaster[]>({
    queryKey: ['general-master', stakeholderMasterModel.title],
    fetchFunction: fetchStakeholderGeneralMaster
  });
  const handleDelete = async (stakeholderGeneralMasterSubCategoryId: string) => {
    await stakeholderGeneralMasterDataApiService.delete(stakeholderGeneralMasterSubCategoryId);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as StakeholderGeneralMaster);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (StakeholderGeneralMaster: StakeholderGeneralMaster) => {
    toggleDrawer();
    setSelectedRow(StakeholderGeneralMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <StakeholderGeneralMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as StakeholderGeneralMaster}
          refetch={refetch}
          stakeholderMasterModel={stakeholderMasterModel}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.${stakeholderMasterModel.title}`)}
            ItemViewComponent={({ data }) => (
              <StakeholderGeneralMasterCard
                stakeholderMasterModel={stakeholderMasterModel}
                stakeholderGeneralMaster={data}
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
              onlyIcon: false,
              permission: {
                action: 'create',
                subject: 'stakeholdermasterdata'
              }
            }}
            fetchDataFunction={refetch}
            items={stakeholderGeneralMasters || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default StakeholderGeneralMasterList;
