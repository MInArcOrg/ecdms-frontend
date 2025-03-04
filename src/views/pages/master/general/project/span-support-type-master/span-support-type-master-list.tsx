// components/SpanSupportTypeMasterList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import { SpanSupportType } from 'src/types/general/general-master';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import SpanSupportTypeMasterCard from './span-support-type-master-card';
import SpanSupportTypeMasterDrawer from './span-support-type-master-drawer';
import spanSupportTypeMasterService from 'src/services/general/project/span-support-type-master-service';

const SpanSupportTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SpanSupportType | null>(null);
  const { t } = useTranslation();
  const fetchSpanSupportTypeMaster = (params: GetRequestParam): Promise<IApiResponse<SpanSupportType[]>> => {
    return spanSupportTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<SpanSupportType[]>({
    queryKey: ['general-master', 'span-support-type'],
    fetchFunction: fetchSpanSupportTypeMaster
  });
  const handleDelete = async (id: string) => {
    await spanSupportTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as SpanSupportType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: SpanSupportType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <SpanSupportTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as SpanSupportType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.span-support-types`)}
            ItemViewComponent={({ data }) => (
              <SpanSupportTypeMasterCard
                type={'span-support-type'}
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
                subject: `spansupporttype`
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

export default SpanSupportTypeMasterList;
