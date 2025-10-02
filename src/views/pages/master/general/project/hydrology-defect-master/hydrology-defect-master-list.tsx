// components/HydrologyDefectMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { HydrologyDefect } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import HydrologyDefectMasterCard from "./hydrology-defect-master-card";
import HydrologyDefectMasterDrawer from "./hydrology-defect-master-drawer";
import hydrologyDefectMasterService from "src/services/general/project/hydrology-defect-master-service";

const HydrologyDefectMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<HydrologyDefect | null>(null);
  const { t } = useTranslation();
  const fetchHydrologyDefectMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<HydrologyDefect[]>> => {
    return hydrologyDefectMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<HydrologyDefect[]>({
    queryKey: ["general-master", "hydrology-defect"],
    fetchFunction: fetchHydrologyDefectMaster,
  });
  const handleDelete = async (id: string) => {
    await hydrologyDefectMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as HydrologyDefect);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: HydrologyDefect) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <HydrologyDefectMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as HydrologyDefect}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.hydrology-defects`)}
            ItemViewComponent={({ data }) => (
              <HydrologyDefectMasterCard
                type={"hydrology-defect"}
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
              onlyIcon: false,
              permission: {
                action: "create",
                subject: `hydrologydefect`,
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

export default HydrologyDefectMasterList;
