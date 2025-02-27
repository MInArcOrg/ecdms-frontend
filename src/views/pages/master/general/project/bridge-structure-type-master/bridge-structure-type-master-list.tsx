// components/BridgeStructureTypeMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { BridgeStructureType } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import BridgeStructureTypeMasterCard from './bridge-structure-type-master-card';
import BridgeStructureTypeMasterDrawer from './bridge-structure-type-master-drawer';
import bridgeStructureTypeMasterService from 'src/services/general/project/bridge-structure-type-master-service';

const BridgeStructureTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<BridgeStructureType | null>(null);
  const { t } = useTranslation();
  const fetchBridgeStructureTypeMaster = (params: GetRequestParam): Promise<IApiResponse<BridgeStructureType[]>> => {
    return bridgeStructureTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<BridgeStructureType[]>({
    queryKey: ['general-master', 'bridge-structure-type'],
    fetchFunction: fetchBridgeStructureTypeMaster
  });
  const handleDelete = async (id: string) => {
    await bridgeStructureTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as BridgeStructureType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: BridgeStructureType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <BridgeStructureTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as BridgeStructureType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.bridge-structure-types`)}
            ItemViewComponent={({ data }) => (
              <BridgeStructureTypeMasterCard
                type={'bridge-structure-type'}
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
                subject: `bridgestructuretype`
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

export default BridgeStructureTypeMasterList;
