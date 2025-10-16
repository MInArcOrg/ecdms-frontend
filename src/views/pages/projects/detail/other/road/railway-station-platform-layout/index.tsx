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
import { RailwayStationPlatformLayout } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformLayoutCard from "./railway-station-platform-layout-card";
import RailwayStationPlatformLayoutDrawer from "./railway-station-platform-layout-drawer";
import { railwayStationPlatformLayoutColumns } from "./railway-station-platform-layout-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformLayoutListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformLayoutList: React.FC<
  RailwayStationPlatformLayoutListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformLayout | null>(null);
  const { t } = useTranslation();

  const fetchPlatformLayout = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformLayout[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformLayout>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: platformLayout,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformLayout[]>({
    queryKey: ["railwayStationPlatformLayout"],
    fetchFunction: fetchPlatformLayout,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformLayout);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformLayout);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformLayout,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformLayout>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformLayout,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapPlatformLayoutToDetailItems = (
    specs: RailwayStationPlatformLayout,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.name",
        ),
        value: specs?.name || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.platforms_number",
        ),
        value: specs?.platforms_number?.toString() || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.platform_configuration",
        ),
        value: specs?.platform_configuration || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.platform_length",
        ),
        value: specs?.platform_length
          ? `${specs.platform_length} ${t("common.units.meters")}`
          : "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.platform_width",
        ),
        value: specs?.platform_width
          ? `${specs.platform_width} ${t("common.units.meters")}`
          : "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.accessibility_features",
        ),
        value: specs?.accessibility_features || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-layout.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || ""}
          />
        ),
      },
      {
        title: t("common.table-columns.created-at"),
        value: specs?.created_at
          ? formatCreatedAt(specs.created_at)
          : "N/A",
      },
      {
        title: t("common.table-columns.updated-at"),
        value: specs?.updated_at
          ? formatCreatedAt(specs.updated_at)
          : "N/A",
      },
    ];

  return (
    <Box>
      {showDrawer && (
        <RailwayStationPlatformLayoutDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformLayout={
            selectedRow as RailwayStationPlatformLayout
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPlatformLayoutToDetailItems(
            selectedRow as RailwayStationPlatformLayout,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_LAYOUT"}
          title={t(
            "project.other.railway-station-platform-layout.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-layout.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformLayoutColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
            otherSubMenu,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayStationPlatformLayoutCard
            onDetail={handleClickDetail}
            railwayStationPlatformLayout={
              data as RailwayStationPlatformLayout
            }
            onEdit={handleEdit}
            refetch={refetch}
            otherSubMenu={otherSubMenu}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "railwaystationplatformlayout",
          },
        }}
        fetchDataFunction={refetch}
        items={platformLayout || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformLayoutList;