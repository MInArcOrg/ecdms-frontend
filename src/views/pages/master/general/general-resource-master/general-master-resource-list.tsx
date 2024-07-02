// components/GeneralMasterResourceList.tsx
import { Card, CardContent } from '@mui/material';
import { useRouter } from 'next/router';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import generalMasterDataApiService from 'src/services/general/general-master-data-service';
import { GeneralMasterResource } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import GeneralMasterResourceCard from './general-master-resource-card';
import GeneralMasterResourceDrawer from './general-master-resource-drawer';

interface GeneralMasterResourceListProps {}

const GeneralMasterResourceList: React.FC<GeneralMasterResourceListProps> = () => {
  const [selectedRow, setSelectedRow] = useState<GeneralMasterResource | null>(null);
  const router = useRouter();
  const { type } = router.query;
  const { t } = useTranslation();
  const fetchGeneralMasterResource = (params: GetRequestParam): Promise<IApiResponse<GeneralMasterResource[]>> => {
    return generalMasterDataApiService.getAllResourceGeneralMaster(String(type), params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<GeneralMasterResource[]>({
    queryKey: ['general-master', String(type)],
    fetchFunction: fetchGeneralMasterResource
  });
  const handleDelete = async (masterSubCategoryId: string) => {
    await generalMasterDataApiService.delete(String(type), masterSubCategoryId);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as GeneralMasterResource);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: GeneralMasterResource) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <GeneralMasterResourceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as GeneralMasterResource}
          refetch={refetch}
          type={String(type)}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.${type}`)}
            ItemViewComponent={({ data }) => (
              <GeneralMasterResourceCard
                type={String(type)}
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
                subject: `${module}type`
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

export default GeneralMasterResourceList;
