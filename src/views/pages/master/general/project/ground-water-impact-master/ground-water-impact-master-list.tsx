// components/GroundWaterImpactMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { GroundWaterImpact } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import GroundWaterImpactMasterCard from "./ground-water-impact-master-card";
import GroundWaterImpactMasterDrawer from "./ground-water-impact-master-drawer";
import groundWaterImpactMasterService from "src/services/general/project/ground-water-impact-master-service";

const GroundWaterImpactMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<GroundWaterImpact | null>(
    null,
  );
  const { t } = useTranslation();
  const fetchGroundWaterImpactMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<GroundWaterImpact[]>> => {
    return groundWaterImpactMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<GroundWaterImpact[]>({
    queryKey: ["general-master", "ground-water-impact"],
    fetchFunction: fetchGroundWaterImpactMaster,
  });
  const handleDelete = async (id: string) => {
    await groundWaterImpactMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as GroundWaterImpact);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: GroundWaterImpact) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <GroundWaterImpactMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as GroundWaterImpact}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.ground-water-impacts`)}
            ItemViewComponent={({ data }) => (
              <GroundWaterImpactMasterCard
                type={"ground-water-impact"}
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
                subject: `groundwaterimpact`,
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

export default GroundWaterImpactMasterList;
