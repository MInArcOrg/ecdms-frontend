// components/CurrentConditionMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { CurrentCondition } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import CurrentConditionMasterCard from "./current-condition-master-card";
import CurrentConditionMasterDrawer from "./current-condition-master-drawer";
import currentConditionMasterService from "src/services/general/project/current-condition-master-service";

const CurrentConditionMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<CurrentCondition | null>(null);
  const { t } = useTranslation();
  const fetchCurrentConditionMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<CurrentCondition[]>> => {
    return currentConditionMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CurrentCondition[]>({
    queryKey: ["general-master", "current-condition"],
    fetchFunction: fetchCurrentConditionMaster,
  });
  const handleDelete = async (id: string) => {
    await currentConditionMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as CurrentCondition);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: CurrentCondition) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <CurrentConditionMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as CurrentCondition}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.current-conditions`)}
            ItemViewComponent={({ data }) => (
              <CurrentConditionMasterCard
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
                subject: `currentcondition`,
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

export default CurrentConditionMasterList;
