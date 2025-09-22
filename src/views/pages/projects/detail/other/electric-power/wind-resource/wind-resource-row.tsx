"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { WindResource } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: WindResource;
}

export const windResourceColumns = (
  onDetail: (windResource: WindResource) => void,
  onEdit: (windResource: WindResource) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.3,
    minWidth: 200,
    field: "wind_speed_at_hub_height",
    headerName: t(
      "project.other.wind-resource.details.wind-speed-at-hub-height",
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
        {row?.wind_speed_at_hub_height !== undefined
          ? `${row.wind_speed_at_hub_height} ${t("common.meters-per-second")}`
          : row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t("project.other.wind-resource.details.weibull-shape-factor"),
    field: "weibull_shape_factor",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.weibull_shape_factor !== undefined
          ? row.weibull_shape_factor
            ? t("common.yes")
            : t("common.no")
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.3,
    minWidth: 150,
    headerName: t("project.other.wind-resource.details.remark"),
    field: "remark",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.2,
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
          model="WindResource"
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
            subject: "windresource",
          }}
          editPermissionRule={{
            action: "update",
            subject: "windresource",
          }}
        />
      </Fragment>
    ),
  },
];
