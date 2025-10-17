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
import { RailwayStationPlatformSafetyAndSecurity } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import RailwayStationPlatformSafetyAndSecurityCard from "./railway-station-platform-safety-and-security-card";
import RailwayStationPlatformSafetyAndSecurityDrawer from "./railway-station-platform-safety-and-security-drawer";
import { railwayStationPlatformSafetyAndSecurityColumns } from "./railway-station-platform-safety-and-security-row";
import FileDrawer from "src/views/components/custom/files-drawer";

interface RailwayStationPlatformSafetyAndSecurityListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const RailwayStationPlatformSafetyAndSecurityList: React.FC<
  RailwayStationPlatformSafetyAndSecurityListProps
> = ({ otherSubMenu, projectId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<RailwayStationPlatformSafetyAndSecurity | null>(null);
  const { t } = useTranslation();

  const fetchSafetyAndSecurity = (
    params: GetRequestParam,
  ): Promise<IApiResponse<RailwayStationPlatformSafetyAndSecurity[]>> => {
    return projectOtherApiSecondService<RailwayStationPlatformSafetyAndSecurity>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: safetyAndSecurity,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<RailwayStationPlatformSafetyAndSecurity[]>({
    queryKey: ["railwayStationPlatformSafetyAndSecurity"],
    fetchFunction: fetchSafetyAndSecurity,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSafetyAndSecurity);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as RailwayStationPlatformSafetyAndSecurity);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    specs: RailwayStationPlatformSafetyAndSecurity,
  ) => {
    toggleDrawer();
    setSelectedRow(specs);
  };

  const handleDelete = async (id: string) => {
    await projectOtherApiSecondService<RailwayStationPlatformSafetyAndSecurity>().delete(
      otherSubMenu?.apiRoute || "",
      id,
    );
    refetch();
  };

  const handleClickDetail = (
    specs: RailwayStationPlatformSafetyAndSecurity,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(specs);
  };

  const mapSafetyAndSecurityToDetailItems = (
    specs: RailwayStationPlatformSafetyAndSecurity,
  ): { title: string; value: any }[] => [
      {
        title: t("common.table-columns.id"),
        value: specs?.id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-safety-and-security.details.railway_station_platform_layout_id",
        ),
        value: specs?.railwayStationPlatformLayout?.name || specs?.railway_station_platform_layout_id || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-safety-and-security.details.platform_safety_and_security",
        ),
        value: specs?.platform_safety_and_security || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-safety-and-security.details.fire_safety_measures",
        ),
        value: specs?.fire_safety_measures || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-safety-and-security.details.surveillance_systems",
        ),
        value: specs?.surveillance_systems || "N/A",
      },
      {
        title: t(
          "project.other.railway-station-platform-safety-and-security.details.remark",
        ),
        value: specs?.remark || "N/A",
      },
      {
        title: t("common.form.attachments"),
        value: (
          <FileDrawer
            id={specs.id}
            type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SAFETY_AND_SECURITY"}
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
        <RailwayStationPlatformSafetyAndSecurityDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          railwayStationPlatformSafetyAndSecurity={
            selectedRow as RailwayStationPlatformSafetyAndSecurity
          }
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapSafetyAndSecurityToDetailItems(
            selectedRow as RailwayStationPlatformSafetyAndSecurity,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={"RAILWAY_STATION_PLATFORM_SAFETY_AND_SECURITY"}
          title={t(
            "project.other.railway-station-platform-safety-and-security.detail",
          )}
        />
      )}

      <ItemsListing
        title={t(
          "project.other.railway-station-platform-safety-and-security.title",
        )}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: railwayStationPlatformSafetyAndSecurityColumns(
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
          <RailwayStationPlatformSafetyAndSecurityCard
            onDetail={handleClickDetail}
            railwayStationPlatformSafetyAndSecurity={
              data as RailwayStationPlatformSafetyAndSecurity
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
            subject: "railwaystationplatformsafetyandsecurity",
          },
        }}
        fetchDataFunction={refetch}
        items={safetyAndSecurity || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default RailwayStationPlatformSafetyAndSecurityList;