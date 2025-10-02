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
import type { RailwayTracksGeometryData } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import RailwayTracksGeometryDataCard from "./railway-tracks-geometry-data-card";
import RailwayTracksGeometryDataDrawer from "./railway-tracks-geometry-data-drawer";
import { railwayTracksGeometryDataColumns } from "./railway-tracks-geometry-data-row";

interface RailwayTracksGeometryDataListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}
const RailwayTracksGeometryDataList: React.FC<
  RailwayTracksGeometryDataListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayTracksGeometryData | null>(null);
  const { t } = useTranslation();

  const fetchRailwayTracksGeometryData = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayTracksGeometryData[]>> => {
    return projectOtherApiSecondService<RailwayTracksGeometryData>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: railwayTracksGeometryData,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayTracksGeometryData[]>({
    queryKey: ["railwayTracksGeometryData"],
    fetchFunction: fetchRailwayTracksGeometryData,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayTracksGeometryData);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayTracksGeometryData);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (railwayTracksGeometryData: RailwayTracksGeometryData) => {
    toggleDrawer();
    setSelectedRow(railwayTracksGeometryData);
  };

  const handleDelete = async (railwayTracksGeometryDataId: string) => {
    await projectOtherApiSecondService<RailwayTracksGeometryData>().delete(
      otherSubMenu?.apiRoute || "",
      railwayTracksGeometryDataId,
    );
    refetch();
  };

  const handleClickDetail = (
    railwayTracksGeometryData: RailwayTracksGeometryData,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(railwayTracksGeometryData);
  };

  const mapRailwayTracksGeometryDataToDetailItems = (
    railwayTracksGeometryData: RailwayTracksGeometryData,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.railway-tracks-geometry-data.details.alignment"),
      value: railwayTracksGeometryData?.alignment || "N/A",
    },
    {
      title: t("project.other.railway-tracks-geometry-data.details.gradient"),
      value:
        railwayTracksGeometryData?.gradient !== undefined
          ? railwayTracksGeometryData.gradient.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.railway-tracks-geometry-data.details.curvature-radius",
      ),
      value:
        railwayTracksGeometryData?.curvature_radius !== undefined
          ? railwayTracksGeometryData.curvature_radius.toString()
          : "N/A",
    },
    {
      title: t("project.other.railway-tracks-geometry-data.details.cant"),
      value: railwayTracksGeometryData?.cant || "N/A",
    },
    {
      title: t(
        "project.other.railway-tracks-geometry-data.details.track-gauge",
      ),
      value: railwayTracksGeometryData?.track_gauge || "N/A",
    },
    {
      title: t(
        "project.other.railway-tracks-geometry-data.details.cross-level",
      ),
      value: railwayTracksGeometryData?.cross_level || "N/A",
    },
    {
      title: t(
        "project.other.railway-tracks-geometry-data.details.track-surface-profile",
      ),
      value: railwayTracksGeometryData?.track_surface_profile || "N/A",
    },
    {
      title: t("project.other.railway-tracks-geometry-data.details.twist"),
      value: railwayTracksGeometryData?.twist || "N/A",
    },
    {
      title: t("project.other.railway-tracks-geometry-data.details.remark"),
      value: railwayTracksGeometryData?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: railwayTracksGeometryData?.created_at
        ? formatCreatedAt(railwayTracksGeometryData.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: railwayTracksGeometryData?.updated_at
        ? formatCreatedAt(railwayTracksGeometryData.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <RailwayTracksGeometryDataDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayTracksGeometryData={selectedRow as RailwayTracksGeometryData}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapRailwayTracksGeometryDataToDetailItems(
            selectedRow as RailwayTracksGeometryData,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other.electric_grid_control_center_data
          }
          title={t(
            "project.other.railway-tracks-geometry-data.details-tracks-geometry-data-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.railway-tracks-geometry-data.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayTracksGeometryDataColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <RailwayTracksGeometryDataCard
            onDetail={handleClickDetail}
            railwayTracksGeometryData={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
            t={t}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "electricgridcontrolcenterdata",
          },
        }}
        fetchDataFunction={refetch}
        items={railwayTracksGeometryData || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayTracksGeometryDataList;
