// components/MasterSubCategoryList.tsx
import { Card, CardContent, ListItemButton, ListItemText } from "@mui/material";
import React, { Fragment, useState } from "react";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { MasterCategory, MasterSubCategory } from "src/types/master/master-types";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import MasterSubCategoryDrawer from "./master-sub-category-drawer";
import masterSubCategoryApiService from "src/services/master-data/master-sub-category-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { masterSubCategoryRowColumns } from "./master-sub-category-row";
import { useTranslation } from "react-i18next";
interface MasterSubCategoryListProps {
  model: string;
  selectedCategory: MasterCategory | null;
}

const MasterSubCategoryList: React.FC<MasterSubCategoryListProps> = ({
  model,
  selectedCategory,
}) => {
  const dynamicVarName = `${model}category_id`;
  const fetchMasterSubCategory = (
    params: GetRequestParam
  ): Promise<IApiResponse<MasterSubCategory[]>> => {
    return masterSubCategoryApiService.getAll(model, {...params,filter:{...params.filter,[dynamicVarName]:selectedCategory?.id}});
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();
  const [selectedRow, setSelectedRow] = useState<MasterSubCategory | null>(null);
  const { t } = useTranslation();

  const toggleDrawer = () => {
    setShowDrawer(!showDrawer);
  };
  const {
    data: categorys,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<MasterSubCategory[]>({
    queryKey: ["masterSubCategory", model],
    fetchFunction: fetchMasterSubCategory,
  });

  const handleDelete = (masterSubCategoryId: string) => {

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
          categoryId={selectedCategory?.id||""}
          typeId={selectedCategory?.[`${model}type_id`] || ""}
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
                action: "create",
                subject: "position",
              },
            }}
            tableProps={{ headers: masterSubCategoryRowColumns(handleEdit, handleDelete, t, refetch) }}
            fetchDataFunction={refetch}
            items={categorys || []}
            onPaginationChange={handlePageChange}
          />
        
    </Fragment>
  );
};

export default MasterSubCategoryList;