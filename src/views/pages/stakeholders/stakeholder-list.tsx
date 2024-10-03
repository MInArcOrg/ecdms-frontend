/* eslint-disable prettier/prettier */
import { Box, Card } from "@mui/material";

import { useState } from "react";
import { useTranslation } from "react-i18next";

import { useRouter } from "next/router";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { defaultCreateActionConfig } from "src/types/general/listing";
import { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import StakeholderDrawer from "./stakeholder-drawer";
import StakeholderCard from "./stakeholder-card";
import { StakeholderRow } from "./stakeholder-row";
import { Stakeholder } from "src/types/stakeholder";
import stakeholderApiService from "src/services/stakeholder/stakeholder-service";

function StakholdersList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Stakeholder | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchResources = (
    params: GetRequestParam
  ): Promise<IApiResponse<Stakeholder[]>> => {
    return stakeholderApiService.getAll({ ...params, filter: { ...params.filter, stakeholdertype_id: typeId } });
  };

  const {
    data: stakeholders,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Stakeholder[]>({
    queryKey: ["stakesholders", typeId as string],
    fetchFunction: fetchResources,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Stakeholder);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resource: Stakeholder) => {
    toggleDrawer();
    setSelectedRow(resource);
  };
  const handleDelete = async (resourceId: string) => {
    await stakeholderApiService.delete(resourceId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholderDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholder={selectedRow as Stakeholder}
          refetch={refetch}
          typeId={String(typeId)}
        />
      )}
      <Card>
        <ItemsListing
          title={t("stakeholder.title")}
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <StakeholderCard
              stakeholder={data}
              onDelete={handleDelete}
              onEdit={handleEdit}
              t={t}
              refetch={refetch}
            />
          )}
          createActionConfig={{
            ...defaultCreateActionConfig,
            onClick: toggleDrawer,
            onlyIcon: false,
            permission: {
              action: "create",
              subject: "resource",
            },
          }}
          fetchDataFunction={refetch}
          tableProps={{
            headers: StakeholderRow(
              handleEdit,
              handleDelete,
              t,
              refetch,
              String(typeId)
            ),
          }}
          items={stakeholders || []}
          onPaginationChange={handlePageChange}
        />
      </Card>
    </Box>
  );
}

export default StakholdersList;
