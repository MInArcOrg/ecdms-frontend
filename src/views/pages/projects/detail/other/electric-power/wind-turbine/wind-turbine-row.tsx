"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { WindTurbine } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: WindTurbine;
}

export const windTurbineColumns = (
  onDetail: (windTurbine: WindTurbine) => void,
  onEdit: (windTurbine: WindTurbine) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  towerTypeMap: Map<string, string>,
  generatorTypeMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "turbine_manufacturer",
    headerName: t("project.other.wind-turbine.details.turbine-manufacturer"),
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
        {row?.turbine_manufacturer || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.wind-turbine.details.turbine-model"),
    field: "turbine_model",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.turbine_model || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.wind-turbine.details.rotor-diameter"),
    field: "rotor_diameter",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.rotor_diameter !== undefined
          ? `${row.rotor_diameter} ${t("common.meters")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.wind-turbine.details.hub-height"),
    field: "hub_height",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.hub_height !== undefined
          ? `${row.hub_height} ${t("common.meters")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.wind-turbine.details.tower-type"),
    field: "tower_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.tower_type_id
          ? towerTypeMap.get(row.tower_type_id) || t("common.not-available")
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
          model="WindTurbine"
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
            subject: "windturbine",
          }}
          editPermissionRule={{
            action: "update",
            subject: "windturbine",
          }}
        />
      </Fragment>
    ),
  },
];
