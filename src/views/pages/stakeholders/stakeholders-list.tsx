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
import { Stakeholders } from "src/types/stakeholders";
import StakeholdersDrawer from "./stakeholders-drawer";
import stakeholdersApiService from "src/services/stakeholders/stakeholders-service";
import StakeholdersCard from "./stakeholders-card";
import { StakeholdersRow } from "./stakeholders-row";

function StakholdersList() {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<Stakeholders | null>(null);
  const { t } = useTranslation();
  const router = useRouter();
  const { typeId } = router.query;
  const fetchResources = (
    params: GetRequestParam
  ): Promise<IApiResponse<Stakeholders[]>> => {
    return stakeholdersApiService.getAll(params);
  };

  const {
    data: stakeholders,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<Stakeholders[]>({
    queryKey: ["stakesholders"],
    fetchFunction: fetchResources,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as Stakeholders);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (resource: Stakeholders) => {
    toggleDrawer();
    setSelectedRow(resource);
  };
  const handleDelete = async (resourceId: string) => {
    await stakeholdersApiService.delete(resourceId);
    refetch();
  };

  return (
    <Box>
      {showDrawer && (
        <StakeholdersDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          stakeholders={selectedRow as Stakeholders}
          refetch={refetch}
          typeId={String(typeId)}
        />
      )}
      <Card>
        <ItemsListing
          pagination={pagination}
          type={ITEMS_LISTING_TYPE.table.value}
          isLoading={isLoading}
          ItemViewComponent={({ data }) => (
            <StakeholdersCard
              stakeholders={data}
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
            headers: StakeholdersRow(
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
