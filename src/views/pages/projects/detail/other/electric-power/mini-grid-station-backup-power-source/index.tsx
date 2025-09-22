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
import type {
  MiniGridStationBackupPowerSource,
  MiniGridStation,
} from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt, formatDate } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import { useQuery } from "@tanstack/react-query";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import MiniGridStationBackupPowerSourceCard from "./mini-grid-station-backup-power-source-card";
import MiniGridStationBackupPowerSourceDrawer from "./mini-grid-station-backup-power-source-drawer";
import { miniGridStationBackupPowerSourceColumns } from "./mini-grid-station-backup-power-source-row";

interface MiniGridStationBackupPowerSourceListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const MiniGridStationBackupPowerSourceList: React.FC<
  MiniGridStationBackupPowerSourceListProps
> = ({ otherSubMenu, projectId, typeId }) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] =
    useState<MiniGridStationBackupPowerSource | null>(null);
  const { t } = useTranslation();

  const { data: miniGridStations } = useQuery({
    queryKey: ["mini-grid-stations", projectId],
    queryFn: () =>
      projectOtherApiSecondService<MiniGridStation>().getAll(
        "mini-grid-stations",
        {},
      ),
  });

  const fetchMiniGridStationBackupPowerSources = (
    params: GetRequestParam,
  ): Promise<IApiResponse<MiniGridStationBackupPowerSource[]>> => {
    return projectOtherApiSecondService<MiniGridStationBackupPowerSource>().getAll(
      otherSubMenu?.apiRoute || "",
      {},
    );
  };

  const {
    data: miniGridStationBackupPowerSources,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<MiniGridStationBackupPowerSource[]>({
    queryKey: ["miniGridStationBackupPowerSources"],
    fetchFunction: fetchMiniGridStationBackupPowerSources,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as MiniGridStationBackupPowerSource);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as MiniGridStationBackupPowerSource);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (
    miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource,
  ) => {
    toggleDrawer();
    setSelectedRow(miniGridStationBackupPowerSource);
  };

  const handleDelete = async (miniGridStationBackupPowerSourceId: string) => {
    await projectOtherApiSecondService<MiniGridStationBackupPowerSource>().delete(
      otherSubMenu?.apiRoute || "",
      miniGridStationBackupPowerSourceId,
    );
    refetch();
  };

  const handleClickDetail = (
    miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource,
  ) => {
    toggleDetailDrawer();
    setSelectedRow(miniGridStationBackupPowerSource);
  };

  // Create a map for mini grid stations to display names instead of IDs
  const miniGridStationsMap = new Map(
    miniGridStations?.payload.map((item: MiniGridStation) => [
      item.id,
      item.name || "",
    ]) || [],
  );

  const mapMiniGridStationBackupPowerSourceToDetailItems = (
    miniGridStationBackupPowerSource: MiniGridStationBackupPowerSource,
  ): { title: string; value: string }[] => [
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.name",
      ),
      value: miniGridStationBackupPowerSource?.name || "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.mini-grid-station-id",
      ),
      value: miniGridStationBackupPowerSource?.mini_grid_station_id
        ? miniGridStationsMap.get(
            miniGridStationBackupPowerSource?.mini_grid_station_id,
          ) || miniGridStationBackupPowerSource?.mini_grid_station_id
        : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.capacity",
      ),
      value:
        miniGridStationBackupPowerSource?.capacity !== undefined
          ? `${miniGridStationBackupPowerSource.capacity} ${t("common.kw")}`
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.installation-year",
      ),
      value:
        miniGridStationBackupPowerSource?.installation_year !== undefined
          ? miniGridStationBackupPowerSource.installation_year.toString()
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.distribution-lines-total-length",
      ),
      value:
        miniGridStationBackupPowerSource?.distribution_lines_total_length !==
        undefined
          ? `${
              miniGridStationBackupPowerSource.distribution_lines_total_length
            } ${t("common.km")}`
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.lifetime",
      ),
      value:
        miniGridStationBackupPowerSource?.lifetime !== undefined
          ? `${miniGridStationBackupPowerSource.lifetime} ${t("common.years")}`
          : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.commissioning-date",
      ),
      value: miniGridStationBackupPowerSource?.commissioning_date
        ? formatDate(miniGridStationBackupPowerSource.commissioning_date)
        : "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.other",
      ),
      value: miniGridStationBackupPowerSource?.other || "N/A",
    },
    {
      title: t(
        "project.other.mini-grid-station-backup-power-source.details.remark",
      ),
      value: miniGridStationBackupPowerSource?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: miniGridStationBackupPowerSource?.created_at
        ? formatCreatedAt(miniGridStationBackupPowerSource.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: miniGridStationBackupPowerSource?.updated_at
        ? formatCreatedAt(miniGridStationBackupPowerSource.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <MiniGridStationBackupPowerSourceDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          miniGridStationBackupPowerSource={
            selectedRow as MiniGridStationBackupPowerSource
          }
          refetch={refetch}
          projectId={projectId}
          miniGridStations={miniGridStations?.payload || []}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapMiniGridStationBackupPowerSourceToDetailItems(
            selectedRow as MiniGridStationBackupPowerSource,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={
            uploadableProjectFileTypes.other
              .mini_grid_station_backup_power_source
          }
          title={t(
            "project.other.mini-grid-station-backup-power-source.mini-grid-station-backup-power-source-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.mini-grid-station-backup-power-source.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: miniGridStationBackupPowerSourceColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <MiniGridStationBackupPowerSourceCard
            onDetail={handleClickDetail}
            miniGridStationBackupPowerSource={data}
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
            subject: "minigridstationbackuppowersource",
          },
        }}
        fetchDataFunction={refetch}
        items={miniGridStationBackupPowerSources || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default MiniGridStationBackupPowerSourceList;
