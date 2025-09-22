// components/HazardTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { HazardType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import HazardTypeMasterCard from "./hazard-type-master-card";
import HazardTypeMasterDrawer from "./hazard-type-master-drawer";
import hazardTypeMasterService from "src/services/general/project/hazard-type-master-service";

const HazardTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<HazardType | null>(null);
  const { t } = useTranslation();
  const fetchHazardTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<HazardType[]>> => {
    return hazardTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<HazardType[]>({
    queryKey: ["general-master", "hazard-type"],
    fetchFunction: fetchHazardTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await hazardTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as HazardType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: HazardType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <HazardTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as HazardType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.hazard-types`)}
            ItemViewComponent={({ data }) => (
              <HazardTypeMasterCard
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
                action: "create",
                subject: `hazardtype`,
              },
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

export default HazardTypeMasterList;
