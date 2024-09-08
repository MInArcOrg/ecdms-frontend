// components/MasterSubCategoryList.tsx
import React, { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ITEMS_LISTING_TYPE } from 'src/configs/app-constants';
import usePaginatedFetch from 'src/hooks/use-paginated-fetch';
import masterSubCategoryApiService from 'src/services/master-data/master-sub-category-service';
import { defaultCreateActionConfig } from 'src/types/general/listing';
import { MasterCategory, MasterSubCategory } from 'src/types/master/master-types';
import { GetRequestParam, IApiResponse } from 'src/types/requests';
import ItemsListing from 'src/views/shared/listing';
import MasterSubCategoryDrawer from './master-sub-category-drawer';
import { masterSubCategoryRowColumns } from './master-sub-category-row';
import MasterSubCategoryCard from './master-sub-category-card';
interface MasterSubCategoryListProps {
  model: string;
  selectedCategory: MasterCategory | null;
}

const MasterSubCategoryList: React.FC<MasterSubCategoryListProps> = ({ model, selectedCategory }) => {
  const fetchMasterSubCategory = (params: GetRequestParam): Promise<IApiResponse<MasterSubCategory[]>> => {
    return masterSubCategoryApiService.getAll(model, {
      ...params,
      filter: { ...params.filter, [`${model}category_id`]: selectedCategory?.id }
    });
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();
  const [selectedRow, setSelectedRow] = useState<MasterSubCategory | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setSelectedRow({} as MasterSubCategory);
    setShowDrawer(!showDrawer);
  };
  const {
    data: categorys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MasterSubCategory[]>({
    queryKey: ['masterSubCategory', model],
    fetchFunction: fetchMasterSubCategory
  });

  const handleDelete = async (masterSubCategoryId: string) => {
    await masterSubCategoryApiService.delete(model, masterSubCategoryId);
    refetch();
  };
  const handleEdit = (masterSubCategory: MasterSubCategory) => {
    toggleDrawer();
    setSelectedRow(masterSubCategory);
  };
  return (
    <Fragment>
      {showDrawer && (
        <MasterSubCategoryDrawer
          model={model}
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as MasterSubCategory}
          refetch={refetch}
          categoryId={selectedCategory?.id || ''}
          typeId={selectedCategory?.[`${model}type_id`] || ''}
        />
      )}

      <ItemsListing
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        title="master-data.master-sub-category.master-sub-category"
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
          <MasterSubCategoryCard
            model={model}
            masterSubCategory={data}
            onDelete={handleDelete}
            onEdit={handleEdit}
            refetch={refetch}
            t={t}
          />
        )}
        tableProps={{ headers: masterSubCategoryRowColumns(handleEdit, handleDelete, t, refetch) }}
        fetchDataFunction={refetch}
        items={categorys || []}
        onPaginationChange={handlePageChange}
      />
    </Fragment>
  );
};

export default MasterSubCategoryList;
