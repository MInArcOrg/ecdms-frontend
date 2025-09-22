// components/EndwallTypeInletMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { EndwallTypeInlet } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import EndwallTypeInletMasterCard from "./endwall-type-inlet-master-card";
import EndwallTypeInletMasterDrawer from "./endwall-type-inlet-master-drawer";
import endwallTypeInletMasterService from "src/services/general/project/endwall-type-inlet-master-service";

const EndwallTypeInletMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<EndwallTypeInlet | null>(null);
  const { t } = useTranslation();
  const fetchEndwallTypeInletMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<EndwallTypeInlet[]>> => {
    return endwallTypeInletMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<EndwallTypeInlet[]>({
    queryKey: ["general-master", "endwall-type-inlet"],
    fetchFunction: fetchEndwallTypeInletMaster,
  });
  const handleDelete = async (id: string) => {
    await endwallTypeInletMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as EndwallTypeInlet);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: EndwallTypeInlet) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <EndwallTypeInletMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as EndwallTypeInlet}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.endwall-type-inlets`)}
            ItemViewComponent={({ data }) => (
              <EndwallTypeInletMasterCard
                type={"endwall-type-inlet"}
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
                subject: `endwalltypeinlet`,
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

export default EndwallTypeInletMasterList;
