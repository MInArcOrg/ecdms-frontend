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
import { RailwayStationPlatformSignageAndWayFinding } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformSignageAndWayFindingCard from "./railway-station-platform-signage-and-way-finding-card";
import RailwayStationPlatformSignageAndWayFindingDrawer from "./railway-station-platform-signage-and-way-finding-drawer";
import { railwayStationPlatformSignageAndWayFindingColumns } from "./railway-station-platform-signage-and-way-finding-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformSignageAndWayFindingListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformSignageAndWayFindingList: React.FC<
  RailwayStationPlatformSignageAndWayFindingListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformSignageAndWayFinding | null>(null);
  const { t } = useTranslation();

  const fetchSignage = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformSignageAndWayFinding[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformSignageAndWayFinding>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: signage,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformSignageAndWayFinding[]>({
    queryKey: ["railwayStationPlatformSignageAndWayFinding"],
    fetchFunction: fetchSignage,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSignageAndWayFinding);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSignageAndWayFinding);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformSignageAndWayFinding,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformSignageAndWayFinding>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformSignageAndWayFinding,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapSignageToDetailItems = (
    specs: RailwayStationPlatformSignageAndWayFinding,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-signage-and-way-finding.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout ? specs?.railwayStationPlatformLayout.name || specs.railway_station_platform_layout_id : "N/A"
      },
      {
        title: t(
          "project.other.railway-station-platform-signage-and-way-finding.details.signage_type_and_placement",
        ),
        value: specs?.signage_type_and_placement || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-signage-and-way-finding.details.accessibility_signage",
        ),
        value: specs?.accessibility_signage || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-signage-and-way-finding.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("project.other.railway-station-platform-signage-and-way-finding.details.way-finding-aid-document-upload"),
        value: (
          <>
            <FileDrawer
              id={specs.id}
              type={"WAY_FINDING_AID"} // Secondary file type
            />
          </>
        ),
      },
      {
        title: t("common.form.files"),
        value: (
          <>
            <FileDrawer
              id={specs.id}
              type={
                otherSubMenu?.fileType ||
                "RAILWAY_STATION_PLATFORM_SIGNAGE_AND_WAY_FINDING"
              }
            />
          </>
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
        <RailwayStationPlatformSignageAndWayFindingDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformSignageAndWayFinding={
            selectedRow as RailwayStationPlatformSignageAndWayFinding
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSignageToDetailItems(
            selectedRow as RailwayStationPlatformSignageAndWayFinding,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_SIGNAGE_AND_WAY_FINDING"}
          title={t(
            "project.other.railway-station-platform-signage-and-way-finding.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-signage-and-way-finding.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformSignageAndWayFindingColumns(
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
          <RailwayStationPlatformSignageAndWayFindingCard
            onDetail={handleClickDetail}
            railwayStationPlatformSignageAndWayFinding={
              data as RailwayStationPlatformSignageAndWayFinding
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
            subject: "railwaystationplatformsignageandwayfinding",
          },
        }}
        fetchDataFunction={refetch}
        items={signage || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformSignageAndWayFindingList;