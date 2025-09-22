// components/GuardRailTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { GuardRailType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import GuardRailTypeMasterCard from "./guard-rail-type-master-card";
import GuardRailTypeMasterDrawer from "./guard-rail-type-master-drawer";
import guardRailTypeMasterService from "src/services/general/project/guard-rail-type-master-service";

const GuardRailTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<GuardRailType | null>(null);
  const { t } = useTranslation();
  const fetchGuardRailTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<GuardRailType[]>> => {
    return guardRailTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<GuardRailType[]>({
    queryKey: ["general-master", "guard-rail-type"],
    fetchFunction: fetchGuardRailTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await guardRailTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as GuardRailType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: GuardRailType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <GuardRailTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as GuardRailType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.guard-rail-types`)}
            ItemViewComponent={({ data }) => (
              <GuardRailTypeMasterCard
                type={"guard-rail-type"}
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
                subject: `guardrailtype`,
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

export default GuardRailTypeMasterList;
