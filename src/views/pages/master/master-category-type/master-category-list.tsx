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
import MasterCategoryDetailDrawer from './master-category-detail-drawer';
import MasterCategoryDrawer from './master-category-drawer';

interface MasterCategoryListProps {
  model: string;
  selectedType: MasterType | null;
  onCategorySelect: (id: string) => void;
  selectedCategory: MasterCategory | null;
}

const MasterCategoryList: React.FC<MasterCategoryListProps> = ({ model, selectedType, onCategorySelect, selectedCategory }) => {
  const fetchMasterCategory = (params: GetRequestParam): Promise<IApiResponse<MasterCategory[]>> => {
    return masterCategoryApiService.getAll(model, {
      ...params,
      filter: { ...params.filter, [`${model}type_id`]: selectedType?.id }
    });
  };
  const [showDetailDrawer, setShowDetailDrawer] = useState<boolean>();
  const [showFormDrawer, setShowFormDrawer] = useState<boolean>(false);

  const [selectedRow, setSelectedRow] = useState<MasterCategory | null>(null);
  const { t } = useTranslation();

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MasterCategory);
    setShowDetailDrawer(!showDetailDrawer);
  };
  const toggleFormDrawer = () => {
    setSelectedRow({} as MasterCategory);
    setShowFormDrawer(!showFormDrawer);
  };
  const {
    data: categorys,
    isLoading,
    pagination,
    handlePageChange,
    refetch
  } = usePaginatedFetch<MasterCategory[]>({
    queryKey: ['masterCategory', model, selectedType?.id || ''],
    fetchFunction: fetchMasterCategory
  });

  const handleDelete = async (masterCategoryId: string) => {
    await masterCategoryApiService.delete(model, masterCategoryId);
    setShowDetailDrawer(false);
    refetch();

  };
  const handleEdit = (masterCategory: MasterCategory) => {
    toggleFormDrawer();
    setSelectedRow(masterCategory);
  };

  return (
    <Fragment>
      {showFormDrawer && (
        <MasterCategoryDrawer
          typeId={selectedType?.id}
          model={model}
          open={showFormDrawer}
          toggle={toggleFormDrawer}
          masterData={selectedRow as MasterCategory}
          refetch={refetch}
        />
      )}
      {showDetailDrawer && (
        <MasterCategoryDetailDrawer
          typeId={selectedType?.id || ""}
          model={model}
          open={showDetailDrawer}
          handleClose={toggleDetailDrawer}
          masterCategory={selectedRow as MasterCategory}
          refetch={refetch}
          onDelete={handleDelete}
          onEdit={handleEdit}
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
              onClick: toggleFormDrawer,
              onlyIcon: false,
              permission: {
                action: 'create',
                subject: `${model}category`
              }
            }}
            ItemViewComponent={({ data }) => (
              <MasterCategoryCard
                onCategorySelect={onCategorySelect}
                model={model}
                masterCategory={data}
                onDelete={handleDelete}
                onEdit={handleEdit}
                refetch={refetch}
                t={t}
                typeId={selectedType?.id || ''}
                selectedCategory={selectedCategory}
              />
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
