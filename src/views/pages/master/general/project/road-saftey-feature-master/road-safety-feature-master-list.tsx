// components/RoadSafetyFeatureMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { RoadSafetyFeature } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import RoadSafetyFeatureMasterCard from "./road-safety-feature-master-card";
import RoadSafetyFeatureMasterDrawer from "./road-safety-feature-master-drawer";
import roadSafetyMasterService from "src/services/general/project/road-safety-feature-master-service";

const RoadSafetyFeatureMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<RoadSafetyFeature | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchRoadSafetyFeatureMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RoadSafetyFeature[]>> => {
    return roadSafetyMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RoadSafetyFeature[]>({
    queryKey: ["general-master", "road-safety-feature"],
    fetchFunction: fetchRoadSafetyFeatureMaster,
  });
  const handleDelete = async (id: string) => {
    await roadSafetyMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as RoadSafetyFeature);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: RoadSafetyFeature) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <RoadSafetyFeatureMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as RoadSafetyFeature}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.road-safety-features`)}
            ItemViewComponent={({ data }) => (
              <RoadSafetyFeatureMasterCard
                type={"road-safety-feature"}
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
                subject: `roadsafetyfeature`,
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

export default RoadSafetyFeatureMasterList;
