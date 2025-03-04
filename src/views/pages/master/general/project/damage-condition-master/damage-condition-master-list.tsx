// components/DamageConditionMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { DamageCondition } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import DamageConditionMasterCard from './damage-condition-master-card';
import DamageConditionMasterDrawer from './damage-condition-master-drawer';
import damageConditionMasterService from 'src/services/general/project/damage-condition-master-service';

const DamageConditionMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DamageCondition | null>(null);
  const { t } = useTranslation();
  const fetchDamageConditionMaster = (params: GetRequestParam): Promise<IApiResponse<DamageCondition[]>> => {
    return damageConditionMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<DamageCondition[]>({
    queryKey: ['general-master', 'damage-condition'],
    fetchFunction: fetchDamageConditionMaster
  });
  const handleDelete = async (id: string) => {
    await damageConditionMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as DamageCondition);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: DamageCondition) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <DamageConditionMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DamageCondition}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.damage-conditions`)}
            ItemViewComponent={({ data }) => (
              <DamageConditionMasterCard
                type={'damage-condition'}
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
                subject: `damagecondition`
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

export default DamageConditionMasterList;
