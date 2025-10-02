// components/SuggestedRepairMasterList.tsx
import { Card, CardContent } from "@mui/material";
import React, { Fragment, useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { SuggestedRepair } from "src/types/general/general-master";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import SuggestedRepairMasterCard from "./suggested-repair-master-card";
import SuggestedRepairMasterDrawer from "./suggested-repair-master-drawer";
import suggestedRepairMasterService from "src/services/general/project/suggested-repair-master-service";

const SuggestedRepairMasterList: React.FC = () => {
  const [selectedRow, setSelectedRow] = useState<SuggestedRepair | null>(null);
  const { t } = useTranslation();
  const fetchSuggestedRepairMaster = (
    params: GetRequestParam,
  ): Promise<IApiResponse<SuggestedRepair[]>> => {
    return suggestedRepairMasterService.getAll(params);
  };
  const [showDrawer, setShowDrawer] = useState<boolean>();

  const {
    data: types,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<SuggestedRepair[]>({
    queryKey: ["general-master", "suggested-repair"],
    fetchFunction: fetchSuggestedRepairMaster,
  });
  const handleDelete = async (id: string) => {
    await suggestedRepairMasterService.delete(id);
    refetch();
  };

  const toggleDrawer = () => {
    setSelectedRow({} as SuggestedRepair);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (generalMaster: SuggestedRepair) => {
    toggleDrawer();
    setSelectedRow(generalMaster);
  };
  return (
    <Fragment>
      {showDrawer && (
        <SuggestedRepairMasterDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          masterData={selectedRow as SuggestedRepair}
          refetch={refetch}
        />
      )}
      <Card>
        <CardContent>
          <ItemsListing
            pagination={pagination}
            type={ITEMS_LISTING_TYPE.list.value}
            title={t(`master-data.general-master.suggested-repairs`)}
            ItemViewComponent={({ data }) => (
              <SuggestedRepairMasterCard
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
                subject: `suggestedrepair`,
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

export default SuggestedRepairMasterList;
