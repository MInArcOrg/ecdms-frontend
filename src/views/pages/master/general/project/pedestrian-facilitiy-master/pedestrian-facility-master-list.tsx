// components/PedestrianFacilityMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { PedestrianFacility } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import PedestrianFacilityMasterCard from "./pedestrian-facility-master-card";
import PedestrianFacilityMasterDrawer from "./pedestrian-facility-master-drawer";
import pedestrianFacilityMasterService from "src/services/general/project/pedestrian-facility-master-service";

const PedestrianFacilityMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<PedestrianFacility | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchPedestrianFacilityMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<PedestrianFacility[]>> => {
    return pedestrianFacilityMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<PedestrianFacility[]>({
    queryKey: ["general-master", "pedestrian-facilities"],
    fetchFunction: fetchPedestrianFacilityMaster,
  });
  const handleDelete = async (id: string) => {
    await pedestrianFacilityMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as PedestrianFacility);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: PedestrianFacility) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <PedestrianFacilityMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as PedestrianFacility}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.pedestrian-facilities`)}
            ItemViewComponent={({ data }) => (
              <PedestrianFacilityMasterCard
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
                subject: `pedestrianfacility`,
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

export default PedestrianFacilityMasterList;
