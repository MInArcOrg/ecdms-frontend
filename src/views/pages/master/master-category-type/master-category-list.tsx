// components/MasterCategoryList.tsx
import { Card, CardContent } from '@mui/material';
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import masterCategoryApiService from 'src/services/master-data/master-category-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { MasterCategory, MasterType } from 'src/types/master/master-types';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import MasterCategoryCard from './master-category-card';
import MasterCategoryDrawer from './master-category-drawer';

interface MasterCategoryListProps {
  model: string;
  selectedType: MasterType | null;
}

const MasterCategoryList: React.FC<MasterCategoryListProps> = ({ model, selectedType }) => {
  const fetchMasterCategory = (params: GetRequestParam): Promise<IApiResponse<MasterCategory[]>> => {
    return masterCategoryApiService.getAll(model, {
      ...params,
      filter: { ...params.filter, [`${model}type_id`]: selectedType?.id }
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();
  const [selectedRow, setSelectedRow] = useState<MasterCategory | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setSelectedRow({} as MasterCategory);
    setShowDrawer(!showDrawer);
  };
  const {
    data: categorys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MasterCategory[]>({
    queryKey: ['masterCategory', model],
    fetchFunction: fetchMasterCategory
  });

  const handleDelete = async (masterCategoryId: string) => {
    await masterCategoryApiService.delete(model, masterCategoryId);
  };
  const handleEdit = (masterCategory: MasterCategory) => {
    toggleDrawer();
    setSelectedRow(masterCategory);
  };
  return (
    <Fragment>
      {showDrawer && (
        <MasterCategoryDrawer
          typeId={selectedType?.id}
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as MasterCategory}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title="master-data.master-category.master-category"
            isLoading={isLoading}
            createActionConfig={{
              ...defaultCreateActionConfig,
              onClick: toggleDrawer,
              onlyIcon: true,
              permission: {
                action: 'create',
                subject: 'position'
              }
            }}
            ItemViewComponent={({ data }) => (
              <MasterCategoryCard model={model} masterCategory={data} onDelete={handleDelete} onEdit={handleEdit} refetch={refetch} t={t} />
            )}
            fetchDataFunction={refetch}
            items={categorys || []}
            onPaginationChange={handlePageChange}
          />
        </CardContent>
      </Card>
    </Fragment>
  );
};

export default MasterCategoryList;
