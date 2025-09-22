"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { RoadSegment } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RoadSegment;
}

export const roadSegmentColumns = (
  onDetail: (roadSegment: RoadSegment) => void,
  onEdit: (roadSegment: RoadSegment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  surfaceTypeMap: Map<string, string>,
  designStandardMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.road-segment.details.name"),
      field: "name",
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
          {row?.name}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-segment.details.surface-type-id"),
      field: "surface_type_id",
      renderCell: ({ row }: CellType) => {
        const name = surfaceTypeMap.get(row.surface_type_id);
        return name || t("common.not-available");
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-segment.details.start-northing"),
      field: "start_northing",
      renderCell: ({ row }: CellType) =>
        row.start_northing !== undefined
          ? `${row.start_northing} m`
          : t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-segment.details.start-easting"),
      field: "start_easting",
      renderCell: ({ row }: CellType) =>
        row.start_easting !== undefined
          ? `${row.start_easting} m`
          : t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-segment.details.end-northing"),
      field: "end_northing",
      renderCell: ({ row }: CellType) =>
        row.end_northing !== undefined
          ? `${row.end_northing} m`
          : t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-segment.details.end-easting"),
      field: "end_easting",
      renderCell: ({ row }: CellType) =>
        row.end_easting !== undefined
          ? `${row.end_easting} m`
          : t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 180,
      headerName: t("project.other.road-segment.details.design-standard-id"),
      field: "design_standard_id",
      renderCell: ({ row }: CellType) => {
        const name = designStandardMap.get(row.design_standard_id ?? "");
        return name || t("common.not-available");
      },
    },
    {
      flex: 0.15,
      minWidth: 150,
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
            model="RoadSegment"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            deletePermissionRule={{
              action: "delete",
              subject: "roadsegment",
            }}
            editPermissionRule={{
              action: "update",
              subject: "roadsegment",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ];
};
