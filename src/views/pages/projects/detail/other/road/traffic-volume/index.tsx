"use client";

import type React from "react";

import { Box } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ITEMS_LISTING_TYPE } from "src/configs/app-constants";
import usePaginatedFetch from "src/hooks/use-paginated-fetch";
import projectOtherApiSecondService from "src/services/project/project-other-second-service";
import { defaultCreateActionConfig } from "src/types/general/listing";
import type { TrafficVolume } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import TrafficVolumeCard from "./traffic-volume-card";
import TrafficVolumeDrawer from "./traffic-volume-drawer";
import { trafficVolumeColumns } from "./traffic-volume-row";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";

interface TrafficVolumeListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const TrafficVolumeList: React.FC<TrafficVolumeListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<TrafficVolume | null>(null);
  const { t } = useTranslation();

  const fetchTrafficVolumes = (
    params: GetRequestParam,
  ): Promise<IApiResponse<TrafficVolume[]>> => {
    return projectOtherApiSecondService<TrafficVolume>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: trafficVolumes,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<TrafficVolume[]>({
    queryKey: ["trafficVolumes"],
    fetchFunction: fetchTrafficVolumes,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as TrafficVolume);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as TrafficVolume);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (trafficVolume: TrafficVolume) => {
    toggleDrawer();
    setSelectedRow(trafficVolume);
  };

  const handleDelete = async (trafficVolumeId: string) => {
    await projectOtherApiSecondService<TrafficVolume>().delete(
      otherSubMenu?.apiRoute || "",
      trafficVolumeId,
    );
    refetch();
  };

  const handleClickDetail = (trafficVolume: TrafficVolume) => {
    toggleDetailDrawer();
    setSelectedRow(trafficVolume);
  };

  const mapTrafficVolumeToDetailItems = (
    trafficVolume: TrafficVolume,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.traffic-volume.details.name"),
      value: trafficVolume?.name || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.count-type-id"),
      value: trafficVolume?.count_type_id || "N/A",
    },
    {
      title: t(
        "project.other.traffic-volume.details.count-location-coordinate-x",
      ),
      value: trafficVolume?.count_location_coordinate_x?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.traffic-volume.details.count-location-coordinate-y",
      ),
      value: trafficVolume?.count_location_coordinate_y?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.count-time"),
      value: trafficVolume?.count_time
        ? formatCreatedAt(trafficVolume.count_time)
        : "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.lane-number"),
      value: trafficVolume?.lane_number?.toString() || "N/A",
    },
    {
      title: t("project.other.traffic-volume.details.vehicle-number-per-hour"),
      value: trafficVolume?.vehicle_number_per_hour?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.traffic-volume.details.average-daily-traffic-volume",
      ),
      value: trafficVolume?.average_daily_traffic_volume?.toString() || "N/A",
    },
    {
      title: t(
        "project.other.traffic-volume.details.corridor-importance-level",
      ),
      value: trafficVolume?.corridor_importance_level?.toString() || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: trafficVolume?.created_at
        ? formatCreatedAt(trafficVolume.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: trafficVolume?.updated_at
        ? formatCreatedAt(trafficVolume.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <TrafficVolumeDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          trafficVolume={selectedRow as TrafficVolume}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapTrafficVolumeToDetailItems(selectedRow as TrafficVolume)}
          hasReference={false}
          id={selectedRow?.id || ""}
          fileType=""
          title={t("project.other.traffic-volume.traffic-volume-details")}
        />
      )}

      <ItemsListing
        title={t("project.other.traffic-volume.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: trafficVolumeColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <TrafficVolumeCard
            onDetail={handleClickDetail}
            trafficVolume={data}
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
            subject: "trafficvolume",
          },
        }}
        fetchDataFunction={refetch}
        items={trafficVolumes || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default TrafficVolumeList;
