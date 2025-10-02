// components/CountTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { CountType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import CountTypeMasterCard from "./count-type-master-card";
import CountTypeMasterDrawer from "./count-type-master-drawer";
import countTypeMasterService from "src/services/general/project/count-type-master-service";

const CountTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<CountType | null>(null);
  const { t } = useTranslation();
  const fetchCountTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<CountType[]>> => {
    return countTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<CountType[]>({
    queryKey: ["general-master", "count-type"],
    fetchFunction: fetchCountTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await countTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as CountType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: CountType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <CountTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as CountType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.count-types`)}
            ItemViewComponent={({ data }) => (
              <CountTypeMasterCard
                type={"count-type"}
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
                subject: `counttype`,
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
export default CountTypeMasterList;
