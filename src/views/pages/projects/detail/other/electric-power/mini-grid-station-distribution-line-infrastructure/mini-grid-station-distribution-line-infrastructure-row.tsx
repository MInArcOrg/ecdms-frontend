"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { MiniGridStationDistributionLineInfrastructure } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: MiniGridStationDistributionLineInfrastructure;
}

export const miniGridStationDistributionLineInfrastructureColumns = (
  onDetail: (
    miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure,
  ) => void,
  onEdit: (
    miniGridStationDistributionLineInfrastructure: MiniGridStationDistributionLineInfrastructure,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  miniGridStationsMap: Map<string, string>,
  distributionLineTypesMap: Map<string, string>,
  distributionLineMaterialsMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.mini-grid-station-distribution-line-infrastructure.details.name",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography
        noWrap
        component={Button}
        onClick={() => onDetail(row)}
        sx={{
          fontWeight: 500,
          textDecoration: "none",
          color: "text.secondary",
          "&:hover": { color: "primary.main" },
        }}
      >
        {row?.name || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line-infrastructure.details.mini-grid-station-id",
    ),
    field: "mini_grid_station_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.mini_grid_station_id
          ? miniGridStationsMap.get(row.mini_grid_station_id) ||
            row.mini_grid_station_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-type-id",
    ),
    field: "distribution_line_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.distribution_line_type_id
          ? distributionLineTypesMap.get(row.distribution_line_type_id) ||
            row.distribution_line_type_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line-infrastructure.details.distribution-line-material-id",
    ),
    field: "distribution_line_material_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.distribution_line_material_id
          ? distributionLineMaterialsMap.get(
              row.distribution_line_material_id,
            ) || row.distribution_line_material_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line-infrastructure.details.voltage-level",
    ),
    field: "voltage_level",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.voltage_level !== undefined
          ? `${row.voltage_level} ${t("common.kv")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("common.table-columns.created-at"),
    field: "created_at",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {formatCreatedAt(row.created_at)}
      </Typography>
    ),
  },
  {
    minWidth: 150,
    sortable: false,
    field: "actions",
    headerName: t("common.table-columns.actions"),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="MiniGridStationDistributionLineInfrastructure"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: "delete",
            subject: "minigridstationdistributionlineinfrastructure",
          }}
          editPermissionRule={{
            action: "update",
            subject: "minigridstationdistributionlineinfrastructure",
          }}
        />
      </Fragment>
    ),
  },
];
