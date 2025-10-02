"use client";

import type React from "react";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { uploadableProjectFileTypes } from "src/services/utils/file-constants";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { NetworkCapacity } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import NetworkCapacityCard from "./network-capacity-card";
import NetworkCapacityDrawer from "./network-capacity-drawer";
import { networkCapacityColumns } from "./network-capacity-row";
import { useQuery } from "@tanstack/react-query";
import { projectMasterModels } from "src/constants/master-data/project-general-master-constants";
import projectGeneralMasterDataApiService from "src/services/general/project-general-master-data-service";

interface NetworkCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const NetworkCapacityList: React.FC<NetworkCapacityListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<NetworkCapacity | null>(null);
  const { t } = useTranslation();

  // Fetch master data for displaying titles instead of IDs
  const { data: networkTypes } = useQuery({
    queryKey: ["network-types"],
    queryFn: () =>
      projectGeneralMasterDataApiService.getAll({
        filter: { model: projectMasterModels.mobileNetworkType.model },
      }),
  });

  // Create maps for quick lookup
  const networkTypeMap = new Map(
    networkTypes?.payload.map((item) => [item.id, item.title || ""]) || [],
  );

  const fetchNetworkCapacities = (
    params: GetRequestParam,
  ): Promise<IApiResponse<NetworkCapacity[]>> => {
    return projectOtherApiSecondService<NetworkCapacity>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: networkCapacities,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<NetworkCapacity[]>({
    queryKey: ["networkCapacities"],
    fetchFunction: fetchNetworkCapacities,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as NetworkCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as NetworkCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (networkCapacity: NetworkCapacity) => {
    toggleDrawer();
    setSelectedRow(networkCapacity);
  };

  const handleDelete = async (networkCapacityId: string) => {
    await projectOtherApiSecondService<NetworkCapacity>().delete(
      otherSubMenu?.apiRoute || "",
      networkCapacityId,
    );
    refetch();
  };

  const handleClickDetail = (networkCapacity: NetworkCapacity) => {
    toggleDetailDrawer();
    setSelectedRow(networkCapacity);
  };

  const mapNetworkCapacityToDetailItems = (
    networkCapacity: NetworkCapacity,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.network-capacity.details.network-type"),
      value:
        networkTypeMap.get(networkCapacity?.network_type_id) ||
        networkCapacity?.network_type_id ||
        "N/A",
    },
    {
      title: t("project.other.network-capacity.details.total-bandwidth"),
      value: networkCapacity?.total_bandwidth?.toString() || "N/A",
    },
    {
      title: t("project.other.network-capacity.details.users-number"),
      value: networkCapacity?.users_number?.toString() || "N/A",
    },
    {
      title: t("project.other.network-capacity.details.remark"),
      value: networkCapacity?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: networkCapacity?.created_at
        ? formatCreatedAt(networkCapacity.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: networkCapacity?.updated_at
        ? formatCreatedAt(networkCapacity.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <NetworkCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          networkCapacity={selectedRow as NetworkCapacity}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapNetworkCapacityToDetailItems(selectedRow as NetworkCapacity)}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.networkCapacity}
          title={t("project.other.network-capacity.network-capacity-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.network-capacity.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: networkCapacityColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            networkTypeMap,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <NetworkCapacityCard
            onDetail={handleClickDetail}
            networkCapacity={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            networkTypeMap={networkTypeMap}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "networkcapacity",
          },
        }}
        fetchDataFunction={refetch}
        items={networkCapacities || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default NetworkCapacityList;
