"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { MiniGridStationDistributionLine } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: MiniGridStationDistributionLine;
}

export const miniGridStationDistributionLineColumns = (
  onDetail: (
    miniGridStationDistributionLine: MiniGridStationDistributionLine,
  ) => void,
  onEdit: (
    miniGridStationDistributionLine: MiniGridStationDistributionLine,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.mini-grid-station-distribution-line.details.name",
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
      "project.other.mini-grid-station-distribution-line.details.system-type",
    ),
    field: "system_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.system_type || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line.details.lines-type",
    ),
    field: "lines_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.lines_type || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line.details.line-length",
    ),
    field: "line_length",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.line_length !== undefined
          ? `${row.line_length} ${t("common.km")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.mini-grid-station-distribution-line.details.poles",
    ),
    field: "poles",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.poles || t("common.not-available")}
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
          model="MiniGridStationDistributionLine"
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
            subject: "minigridstationdistributionline",
          }}
          editPermissionRule={{
            action: "update",
            subject: "minigridstationdistributionline",
          }}
        />
      </Fragment>
    ),
  },
];
