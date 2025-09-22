"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { PowerGenerationCapacity } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: PowerGenerationCapacity;
}

export const powerGenerationCapacityColumns = (
  onDetail: (powerGenerationCapacity: PowerGenerationCapacity) => void,
  onEdit: (powerGenerationCapacity: PowerGenerationCapacity) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "id",
    headerName: t("common.table-columns.id"),
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
        {row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t("project.other.power-generation-capacity.details.capacity"),
    field: "capacity",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.capacity !== undefined
          ? `${row.capacity} MW`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t(
      "project.other.power-generation-capacity.details.annual-generation",
    ),
    field: "annual_generation",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.annual_generation !== undefined
          ? `${row.annual_generation} GWh`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.power-generation-capacity.details.units-number",
    ),
    field: "units_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.units_number !== undefined
          ? row.units_number
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t(
      "project.other.power-generation-capacity.details.commissioning-date",
    ),
    field: "commissioning_date",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.commissioning_date
          ? formatCreatedAt(row.commissioning_date)
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.power-generation-capacity.details.plant-life"),
    field: "plant_life",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.plant_life !== undefined
          ? `${row.plant_life} ${t("common.years")}`
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
          model="PowerGenerationCapacity"
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
            subject: "powergenerationcapacity",
          }}
          editPermissionRule={{
            action: "update",
            subject: "powergenerationcapacity",
          }}
        />
      </Fragment>
    ),
  },
];
