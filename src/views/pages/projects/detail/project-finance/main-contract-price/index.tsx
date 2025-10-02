"use client";

import { Box } from "@mui/material";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectFinanceApiService from "src/services/project/project-finance-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { ProjectGeneralFinance } from "src/types/project/project-finance";
import type { ProjectFinance } from "src/types/project";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import MainContractPriceCard from "./main-contract-price-card";
import MainContractPriceDrawer from "./main-contract-price-drawer";

function MainContractPriceList({ projectId }: { projectId: string }) {
  const [showDrawer, setShowDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<ProjectFinance | null>(null);

  const fetchMainContractPrices = (
    params: GetRequestParam,
  ): Promise<IApiResponse<ProjectFinance[]>> => {
    return projectFinanceApiService.getAll({
      ...params,
      filter: { ...params.filter, project_id: projectId },
    });
  };

  const {
    data: mainContractPrices,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<ProjectFinance[]>({
    queryKey: ["mainContractPrices", projectId],
    fetchFunction: fetchMainContractPrices,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as ProjectFinance);
    setShowDrawer(!showDrawer);
  };

  const handleEdit = (projectFinance: ProjectFinance) => {
    toggleDrawer();
    setSelectedRow(projectFinance);
  };

  const handleDelete = async (projectFinanceId: string) => {
    await projectFinanceApiService.delete(projectFinanceId);
    refetch();
  };

  const { data: projectGeneralFinance } = useQuery({
    queryKey: ["projectFinanceData", projectId],
    queryFn: () =>
      projectFinanceApiService.getProjectGeneralFinance(projectId, {}),
  });

  return (
    <Box>
      {showDrawer && (
        <MainContractPriceDrawer
          open={showDrawer}
          toggle={toggleDrawer}
          projectFinance={selectedRow as ProjectFinance}
          refetch={refetch}
          projectId={projectId}
          projectGeneralFinance={
            projectGeneralFinance?.payload as ProjectGeneralFinance
          }
        />
      )}
      <ItemsListing
        title="project.main-contract-price.title"
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.list.value}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MainContractPriceCard
            onDelete={handleDelete}
            onEdit={handleEdit}
            refetch={refetch}
            projectFinance={data}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "projectfinance",
          },
        }}
        fetchDataFunction={refetch}
        items={mainContractPrices || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
}

export default MainContractPriceList;
