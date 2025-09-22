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
import { RailwaySleeperCharacteristic } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";

import RailwaySleeperCharacteristicCard from "./railway-sleeper-characteristic-card";
import RailwaySleeperCharacteristicDrawer from "./railway-sleeper-characteristic-drawer";
import { railwaySleeperCharacteristicColumns } from "./railway-sleeper-characteristic-row";

interface RailwaySleeperCharacteristicListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwaySleeperCharacteristicList: React.FC<
  RailwaySleeperCharacteristicListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwaySleeperCharacteristic | null>(null);
  const { t } = useTranslation();

  const fetchRailwaySleeperCharacteristic = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwaySleeperCharacteristic[]>> => {
    return projectOtherApiSecondService<RailwaySleeperCharacteristic>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: railwaySleeperCharacteristic,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwaySleeperCharacteristic[]>({
    queryKey: ["railwaySleeperCharacteristic"],
    fetchFunction: fetchRailwaySleeperCharacteristic,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwaySleeperCharacteristic);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwaySleeperCharacteristic);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    railwaySleeperCharacteristic: RailwaySleeperCharacteristic,
  ) => {
    toggleDrawer();
    setSelectedRow(railwaySleeperCharacteristic);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwaySleeperCharacteristic>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    railwaySleeperCharacteristic: RailwaySleeperCharacteristic,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(railwaySleeperCharacteristic);
  };

  const mapRailwaySleeperCharacteristicToDetailItems = (
    railwaySleeperCharacteristic: RailwaySleeperCharacteristic,
  ): { title: string; value: string }[] => [
    {
      title: t("common.table-columns.id"),
      value: railwaySleeperCharacteristic?.project_id || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.railway_line_section_name",
      ),
      value: railwaySleeperCharacteristic?.railway_line_section_name || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_type",
      ),
      value: railwaySleeperCharacteristic?.sleeper_type || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_size_and_dimensions",
      ),
      value:
        railwaySleeperCharacteristic?.sleeper_size_and_dimensions !==
          undefined &&
        railwaySleeperCharacteristic?.sleeper_size_and_dimensions !== null
          ? railwaySleeperCharacteristic.sleeper_size_and_dimensions.toLocaleString()
          : "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_distance_between_pairs",
      ),
      value:
        railwaySleeperCharacteristic?.sleeper_distance_between_pairs || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_material_specification",
      ),
      value:
        railwaySleeperCharacteristic?.sleeper_material_specification || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_spacing",
      ),
      value: railwaySleeperCharacteristic?.sleeper_spacing || "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.spacing_between",
      ),
      value:
        railwaySleeperCharacteristic?.spacing_between !== undefined &&
        railwaySleeperCharacteristic?.spacing_between !== null
          ? railwaySleeperCharacteristic.spacing_between.toLocaleString()
          : "N/A",
    },
    {
      title: t(
        "project.other.railway-sleeper-characteristic.details.sleeper_shape",
      ),
      value: railwaySleeperCharacteristic?.sleeper_shape || "N/A",
    },
    {
      title: t("project.other.railway-sleeper-characteristic.details.remark"),
      value: railwaySleeperCharacteristic?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwaySleeperCharacteristic?.created_at
        ? formatCreatedAt(railwaySleeperCharacteristic.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwaySleeperCharacteristic?.updated_at
        ? formatCreatedAt(railwaySleeperCharacteristic.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwaySleeperCharacteristicDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwaySleeperCharacteristic={
            selectedRow as RailwaySleeperCharacteristic
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwaySleeperCharacteristicToDetailItems(
            selectedRow as RailwaySleeperCharacteristic,
          )}
          hasReference={false}
          id={selectedRow?.project_id || ""}
          fileType=""
          title={t("project.other.railway-sleeper-characteristic.detail")}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-sleeper-characteristic.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwaySleeperCharacteristicColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwaySleeperCharacteristicCard
            onDetail={handleClickDetail}
            railwaySleeperCharacteristic={data as RailwaySleeperCharacteristic}
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
            subject: "railwaysleepercharacteristic",
          },
        }}
        fetchDataFunction={refetch}
        items={railwaySleeperCharacteristic || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwaySleeperCharacteristicList;
