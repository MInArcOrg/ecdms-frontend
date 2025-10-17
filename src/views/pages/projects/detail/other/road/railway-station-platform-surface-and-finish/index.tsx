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
import { RailwayStationPlatformSurfaceAndFinish } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformSurfaceAndFinishCard from "./railway-station-platform-surface-and-finish-card";
import RailwayStationPlatformSurfaceAndFinishDrawer from "./railway-station-platform-surface-and-finish-drawer";
import { railwayStationPlatformSurfaceAndFinishColumns } from "./railway-station-platform-surface-and-finish-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformSurfaceAndFinishListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformSurfaceAndFinishList: React.FC<
  RailwayStationPlatformSurfaceAndFinishListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformSurfaceAndFinish | null>(null);
  const { t } = useTranslation();

  const fetchSurfaceAndFinish = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformSurfaceAndFinish[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformSurfaceAndFinish>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: surfaceAndFinish,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformSurfaceAndFinish[]>({
    queryKey: ["railwayStationPlatformSurfaceAndFinish"],
    fetchFunction: fetchSurfaceAndFinish,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSurfaceAndFinish);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSurfaceAndFinish);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformSurfaceAndFinish,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformSurfaceAndFinish>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformSurfaceAndFinish,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapSurfaceAndFinishToDetailItems = (
    specs: RailwayStationPlatformSurfaceAndFinish,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-surface-and-finish.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout?.name || specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-surface-and-finish.details.flooring_materials",
        ),
        value: specs?.flooring_materials || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-surface-and-finish.details.surface_treatment",
        ),
        value: specs?.surface_treatment || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-surface-and-finish.details.paint_or_color_schemes",
        ),
        value: specs?.paint_or_color_schemes || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-surface-and-finish.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SURFACE_AND_FINISH"}
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
        <RailwayStationPlatformSurfaceAndFinishDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformSurfaceAndFinish={
            selectedRow as RailwayStationPlatformSurfaceAndFinish
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSurfaceAndFinishToDetailItems(
            selectedRow as RailwayStationPlatformSurfaceAndFinish,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_SURFACE_AND_FINISH"}
          title={t(
            "project.other.railway-station-platform-surface-and-finish.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-surface-and-finish.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformSurfaceAndFinishColumns(
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
          <RailwayStationPlatformSurfaceAndFinishCard
            onDetail={handleClickDetail}
            railwayStationPlatformSurfaceAndFinish={
              data as RailwayStationPlatformSurfaceAndFinish
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
            subject: "railwaystationplatformsurfaceandfinish",
          },
        }}
        fetchDataFunction={refetch}
        items={surfaceAndFinish || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformSurfaceAndFinishList;