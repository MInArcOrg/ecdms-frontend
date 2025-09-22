// components/MaintenanceTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { MaintenanceType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import MaintenanceTypeMasterCard from "./maintenance-type-master-card";
import MaintenanceTypeMasterDrawer from "./maintenance-type-master-drawer";
import maintenanceTypeMasterService from "src/services/general/project/maintenance-type-master-service";

const MaintenanceTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<MaintenanceType | null>(null);
  const { t } = useTranslation();
  const fetchMaintenanceTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<MaintenanceType[]>> => {
    return maintenanceTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<MaintenanceType[]>({
    queryKey: ["general-master", "maintenance-type"],
    fetchFunction: fetchMaintenanceTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await maintenanceTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as MaintenanceType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: MaintenanceType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <MaintenanceTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as MaintenanceType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.maintenance-types`)}
            ItemViewComponent={({ data }) => (
              <MaintenanceTypeMasterCard
                type={"maintenance-type"}
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

export default MaintenanceTypeMasterList;
