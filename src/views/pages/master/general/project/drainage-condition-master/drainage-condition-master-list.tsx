// components/DrainageConditionMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DrainageCondition } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import DrainageConditionMasterCard from "./drainage-condition-master-card";
import DrainageConditionMasterDrawer from "./drainage-condition-master-drawer";
import drainageConditionMasterService from "src/services/general/project/drainage-condition-master-service";

const DrainageConditionMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<DrainageCondition | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchDrainageConditionMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<DrainageCondition[]>> => {
    return drainageConditionMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<DrainageCondition[]>({
    queryKey: ["general-master", "drainage-condition"],
    fetchFunction: fetchDrainageConditionMaster,
  });
  const handleDelete = async (id: string) => {
    await drainageConditionMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as DrainageCondition);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: DrainageCondition) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <DrainageConditionMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as DrainageCondition}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.drainage-conditions`)}
            ItemViewComponent={({ data }) => (
              <DrainageConditionMasterCard
                type={"drainage-condition"}
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
                subject: `drainagecondition`,
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

export default DrainageConditionMasterList;
