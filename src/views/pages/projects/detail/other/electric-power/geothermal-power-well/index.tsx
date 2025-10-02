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
import type { GeothermalPowerWell } from "src/types/project/other";
import type { GetRequestParam, IApiResponse } from "src/types/requests";
import { formatCreatedAt, formatDate } from "src/utils/formatter/date";
import ItemsListing from "src/views/shared/listing";
import OtherDetailSidebar from "../../../../../../shared/layouts/other/other-detail-drawer";
import GeothermalPowerWellCard from "./geothermal-power-well-card";
import GeothermalPowerWellDrawer from "./geothermal-power-well-drawer";
import { geothermalPowerWellColumns } from "./geothermal-power-well-row";

interface GeothermalPowerWellListProps {
  otherSubMenu?: DetailSubMenuItemChild;
  typeId: string;
  projectId: string;
}

const GeothermalPowerWellList: React.FC<GeothermalPowerWellListProps> = ({
  otherSubMenu,
  projectId,
  typeId,
}) => {
  const [showDrawer, setShowDrawer] = useState(false);
  const [showDetailDrawer, setShowDetailDrawer] = useState(false);
  const [selectedRow, setSelectedRow] = useState<GeothermalPowerWell | null>(
    null,
  );
  const { t } = useTranslation();

  const fetchGeothermalPowerWells = (
    params: GetRequestParam,
  ): Promise<IApiResponse<GeothermalPowerWell[]>> => {
    return projectOtherApiSecondService<GeothermalPowerWell>().getAll(
      otherSubMenu?.apiRoute || "",
      {
        ...params,
        filter: { ...params.filter, project_id: projectId },
      },
    );
  };

  const {
    data: geothermalPowerWells,
    isLoading,
    pagination,
    handlePageChange,
    refetch,
  } = usePaginatedFetch<GeothermalPowerWell[]>({
    queryKey: ["geothermalPowerWells"],
    fetchFunction: fetchGeothermalPowerWells,
  });

  const toggleDrawer = () => {
    setSelectedRow({} as GeothermalPowerWell);
    setShowDrawer(!showDrawer);
  };

  const toggleDetailDrawer = () => {
    setSelectedRow({} as GeothermalPowerWell);
    setShowDetailDrawer(!showDetailDrawer);
  };

  const handleEdit = (geothermalPowerWell: GeothermalPowerWell) => {
    toggleDrawer();
    setSelectedRow(geothermalPowerWell);
  };

  const handleDelete = async (geothermalPowerWellId: string) => {
    await projectOtherApiSecondService<GeothermalPowerWell>().delete(
      otherSubMenu?.apiRoute || "",
      geothermalPowerWellId,
    );
    refetch();
  };

  const handleClickDetail = (geothermalPowerWell: GeothermalPowerWell) => {
    toggleDetailDrawer();
    setSelectedRow(geothermalPowerWell);
  };

  const mapGeothermalPowerWellToDetailItems = (
    geothermalPowerWell: GeothermalPowerWell,
  ): { title: string; value: string }[] => [
    {
      title: t("project.other.geothermal-power-well.details.wells-name"),
      value: geothermalPowerWell?.wells_name || "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.wells-number"),
      value:
        geothermalPowerWell?.wells_number !== undefined
          ? geothermalPowerWell.wells_number.toString()
          : "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.depth"),
      value:
        geothermalPowerWell?.depth !== undefined
          ? `${geothermalPowerWell.depth} ${t("common.meters")}`
          : "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.well-diameter"),
      value:
        geothermalPowerWell?.well_diameter !== undefined
          ? `${geothermalPowerWell.well_diameter} ${t("common.inches")}`
          : "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.drilling-period"),
      value: geothermalPowerWell?.drilling_period
        ? formatDate(geothermalPowerWell.drilling_period)
        : "N/A",
    },
    {
      title: t(
        "project.other.geothermal-power-well.details.temperature-at-bottom-hole",
      ),
      value:
        geothermalPowerWell?.temperature_at_bottom_hole !== undefined
          ? `${geothermalPowerWell.temperature_at_bottom_hole} °C`
          : "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.plant-life"),
      value:
        geothermalPowerWell?.plant_life !== undefined
          ? `${geothermalPowerWell.plant_life} ${t("common.years")}`
          : "N/A",
    },
    {
      title: t("project.other.geothermal-power-well.details.remark"),
      value: geothermalPowerWell?.remark || "N/A",
    },
    {
      title: t("common.table-columns.created-at"),
      value: geothermalPowerWell?.created_at
        ? formatCreatedAt(geothermalPowerWell.created_at)
        : "N/A",
    },
    {
      title: t("common.table-columns.updated-at"),
      value: geothermalPowerWell?.updated_at
        ? formatCreatedAt(geothermalPowerWell.updated_at)
        : "N/A",
    },
  ];

  return (
    <Box>
      {showDrawer && (
        <GeothermalPowerWellDrawer
          otherSubMenu={otherSubMenu}
          open={showDrawer}
          toggle={toggleDrawer}
          geothermalPowerWell={selectedRow as GeothermalPowerWell}
          refetch={refetch}
          projectId={projectId}
        />
      )}

      {showDetailDrawer && (
        <OtherDetailSidebar
          show={showDetailDrawer}
          toggleDrawer={toggleDetailDrawer}
          data={mapGeothermalPowerWellToDetailItems(
            selectedRow as GeothermalPowerWell,
          )}
          hasReference={true}
          id={selectedRow?.id || ""}
          fileType={uploadableProjectFileTypes.other.geothermalPowerWell}
          title={t(
            "project.other.geothermal-power-well.geothermal-power-well-details",
          )}
        />
      )}

      <ItemsListing
        title={t("project.other.geothermal-power-well.title")}
        pagination={pagination}
        type={ITEMS_LISTING_TYPE.table.value}
        tableProps={{
          headers: geothermalPowerWellColumns(
            handleClickDetail,
            handleEdit,
            handleDelete,
            t,
            refetch,
          ),
        }}
        isLoading={isLoading}
        ItemViewComponent={({ data }) => (
          <GeothermalPowerWellCard
            onDetail={handleClickDetail}
            geothermalPowerWell={data}
            onEdit={handleEdit}
            refetch={refetch}
            onDelete={handleDelete}
          />
        )}
        createActionConfig={{
          ...defaultCreateActionConfig,
          onClick: toggleDrawer,
          onlyIcon: false,
          permission: {
            action: "create",
            subject: "geothermalpowerwell",
          },
        }}
        fetchDataFunction={refetch}
        items={geothermalPowerWells || []}
        onPaginationChange={handlePageChange}
      />
    </Box>
  );
};

export default GeothermalPowerWellList;
