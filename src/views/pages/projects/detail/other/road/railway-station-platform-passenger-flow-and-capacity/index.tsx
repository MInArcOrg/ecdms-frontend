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
import { RailwayStationPlatformPassengerFlowAndCapacity } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformPassengerFlowAndCapacityCard from "./railway-station-platform-passenger-flow-and-capacity-card";
import RailwayStationPlatformPassengerFlowAndCapacityDrawer from "./railway-station-platform-passenger-flow-and-capacity-drawer";
import { railwayStationPlatformPassengerFlowAndCapacityColumns } from "./railway-station-platform-passenger-flow-and-capacity-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformPassengerFlowAndCapacityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformPassengerFlowAndCapacityList: React.FC<
  RailwayStationPlatformPassengerFlowAndCapacityListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformPassengerFlowAndCapacity | null>(null);
  const { t } = useTranslation();

  const fetchPassengerFlow = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformPassengerFlowAndCapacity[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformPassengerFlowAndCapacity>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: passengerFlow,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformPassengerFlowAndCapacity[]>({
    queryKey: ["railwayStationPlatformPassengerFlowAndCapacity"],
    fetchFunction: fetchPassengerFlow,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformPassengerFlowAndCapacity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformPassengerFlowAndCapacity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformPassengerFlowAndCapacity,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformPassengerFlowAndCapacity>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformPassengerFlowAndCapacity,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapPassengerFlowToDetailItems = (
    specs: RailwayStationPlatformPassengerFlowAndCapacity,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout?.name || specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.details.passenger_flow_during_peak_hour",
        ),
        value: specs?.passenger_flow_during_peak_hour || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.details.minimum_passenger_flow",
        ),
        value: specs?.minimum_passenger_flow || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.details.capacity_assessment",
        ),
        value: specs?.capacity_assessment || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_PASSENGER_FLOW_AND_CAPACITY"}
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
        <RailwayStationPlatformPassengerFlowAndCapacityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformPassengerFlowAndCapacity={
            selectedRow as RailwayStationPlatformPassengerFlowAndCapacity
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapPassengerFlowToDetailItems(
            selectedRow as RailwayStationPlatformPassengerFlowAndCapacity,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_PASSENGER_FLOW_AND_CAPACITY"}
          title={t(
            "project.other.railway-station-platform-passenger-flow-and-capacity.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-passenger-flow-and-capacity.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformPassengerFlowAndCapacityColumns(
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
          <RailwayStationPlatformPassengerFlowAndCapacityCard
            onDetail={handleClickDetail}
            railwayStationPlatformPassengerFlowAndCapacity={
              data as RailwayStationPlatformPassengerFlowAndCapacity
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
            subject: "railwaystationplatformpassengerflowandcapacity",
          },
        }}
        fetchDataFunction={refetch}
        items={passengerFlow || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformPassengerFlowAndCapacityList;