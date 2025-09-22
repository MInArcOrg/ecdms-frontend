"use client";

import type React from "react";
import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";

import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "src/views/shared/layouts/other/other-detail-drawer";
import { RailwaySleeperFasteningSystem } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";

import RailwaySleeperFasteningSystemCard from "./railway-sleeper-fastening-system-card";
import RailwaySleeperFasteningSystemDrawer from "./railway-sleeper-fastening-system-drawer";
import { railwaySleeperFasteningSystemColumns } from "./railway-sleeper-fastening-system-row";

interface RailwaySleeperFasteningSystemListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySleeperFasteningSystemList: React.FC<
  RailwaySleeperFasteningSystemListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwaySleeperFasteningSystem | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySleeperFasteningSystem = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySleeperFasteningSystem[]>> => {
    return projectOtherApiSecondService<RailwaySleeperFasteningSystem>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySleeperFasteningSystem,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySleeperFasteningSystem[]>({
    queryKey: ["railwaySleeperFasteningSystem"],
    fetchFunction: fetchRailwaySleeperFasteningSystem,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySleeperFasteningSystem);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySleeperFasteningSystem);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem,
  ) => {
    toggleDrawer();
    setSelectedRow(railwaySleeperFasteningSystem);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySleeperFasteningSystem>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(railwaySleeperFasteningSystem);
  };

  const mapRailwaySleeperFasteningSystemToDetailItems = (
    railwaySleeperFasteningSystem: RailwaySleeperFasteningSystem,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwaySleeperFasteningSystem?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-fastening-system.details.railway_line_section_name",
      ),
      value: railwaySleeperFasteningSystem?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-fastening-system.details.used_fastening_systems_type",
      ),
      value:
        railwaySleeperFasteningSystem?.used_fastening_systems_type || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-fastening-system.details.fastener_condition_assessment",
      ),
      value:
        railwaySleeperFasteningSystem?.fastener_condition_assessment || "N/A",
    },
    {
      title: t("project.other.railway-sleeper-fastening-system.details.remark"),
      value: railwaySleeperFasteningSystem?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwaySleeperFasteningSystem?.created_at
        ? formatCreatedAt(railwaySleeperFasteningSystem.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwaySleeperFasteningSystem?.updated_at
        ? formatCreatedAt(railwaySleeperFasteningSystem.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySleeperFasteningSystemDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySleeperFasteningSystem={
            selectedRow as RailwaySleeperFasteningSystem
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySleeperFasteningSystemToDetailItems(
            selectedRow as RailwaySleeperFasteningSystem,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t("project.other.railway-sleeper-fastening-system.detail")}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-sleeper-fastening-system.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySleeperFasteningSystemColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySleeperFasteningSystemCard
            onDetail={handleClickDetail}
            railwaySleeperFasteningSystem={
              data as RailwaySleeperFasteningSystem
            }
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: true,
          permission: {
            action: "create",
            subject: "railwaysleeperfasteningsystem",
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySleeperFasteningSystem || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySleeperFasteningSystemList;
