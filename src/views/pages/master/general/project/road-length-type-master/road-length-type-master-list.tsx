// components/RoadLengthTypeMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { RoadLengthType } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import RoadLengthTypeMasterCard from "./road-length-type-master-card";
import RoadLengthTypeMasterDrawer from "./road-length-type-master-drawer";
import roadLengthTypeMasterService from "src/services/general/project/road-length-type-master-service";

const RoadLengthTypeMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<RoadLengthType | null>(null);
  const { t } = useTranslation();
  const fetchRoadLengthTypeMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadLengthType[]>> => {
    return roadLengthTypeMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadLengthType[]>({
    queryKey: ["general-master", "road-length-type"],
    fetchFunction: fetchRoadLengthTypeMaster,
  });
  const handleDelete = async (id: string) => {
    await roadLengthTypeMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as RoadLengthType);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: RoadLengthType) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <RoadLengthTypeMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as RoadLengthType}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.road-length-types`)}
            ItemViewComponent={({ data }) => (
              <RoadLengthTypeMasterCard
                type={"road-length-type"}
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
                subject: `roadlengthtype`,
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

export default RoadLengthTypeMasterList;
