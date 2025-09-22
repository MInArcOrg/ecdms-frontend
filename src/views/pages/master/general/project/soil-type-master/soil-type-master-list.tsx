// components/SoilTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { SoilType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import SoilTypeMasterCard from "./soil-type-master-card";
import SoilTypeMasterDrawer from "./soil-type-master-drawer";
import soilTypeMasterService from "src/services/general/project/soil-type-master-service";

const SoilTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SoilType | null>(null);
  const { t } = useTranslation();
  const fetchSoilTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SoilType[]>> => {
    return soilTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SoilType[]>({
    queryKey: ["general-master", "soil-type"],
    fetchFunction: fetchSoilTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await soilTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as SoilType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: SoilType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <SoilTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as SoilType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.soil-types`)}
            ItemViewComponent={({ data }) => (
              <SoilTypeMasterCard
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
                subject: `soiltype`,
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

export default SoilTypeMasterList;
