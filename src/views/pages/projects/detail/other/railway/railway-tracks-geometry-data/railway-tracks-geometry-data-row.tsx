"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { RailwayTracksGeometryData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RailwayTracksGeometryData;
}

export const railwayTracksGeometryDataColumns = (
  onDetail: (data: RailwayTracksGeometryData) => void,
  onEdit: (data: RailwayTracksGeometryData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "alignment",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.alignment",
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
        {row?.alignment || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "gradient",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.gradient",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.gradient !== undefined ? row.gradient : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "curvature_radius",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.curvature-radius",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.curvature_radius !== undefined
          ? row.curvature_radius
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "cant",
    headerName: t("project.other.railway-tracks-geometry-data.details.cant"),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.cant !== undefined ? row.cant : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "track_gauge",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.track-gauge",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.track_gauge !== undefined
          ? row.track_gauge
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "cross_level",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.cross-level",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.cross_level !== undefined
          ? row.cross_level
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "track_surface_profile",
    headerName: t(
      "project.other.railway-tracks-geometry-data.details.track-surface-profile",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.track_surface_profile !== undefined
          ? row.track_surface_profile
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "twist",
    headerName: t("project.other.railway-tracks-geometry-data.details.twist"),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.twist !== undefined ? row.twist : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "remark",
    headerName: t("project.other.railway-tracks-geometry-data.details.remark"),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark !== undefined ? row.remark : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "created_at",
    headerName: t("common.table-columns.created-at"),
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
          model="RailwayTracksGeometryData"
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
            subject: "railwaytracksgeometrydata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwaytracksgeometrydata",
          }}
        />
      </Fragment>
    ),
  },
];
