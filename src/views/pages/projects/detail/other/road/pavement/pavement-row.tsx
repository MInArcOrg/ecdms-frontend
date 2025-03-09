"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { Pavement } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: Pavement
}

export const pavementColumns = (
  onDetail: (pavement: Pavement) => void,
  onEdit: (pavement: Pavement) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  roadLengthTypeMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.pavement.details.name"),
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
      headerName: t("project.other.pavement.details.tangent-length"),
      field: "tangent_length",
      renderCell: ({ row }: CellType) => row.tangent_length?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.pavement.details.curve-length"),
      field: "curve_length",
      renderCell: ({ row }: CellType) => row.curve_length?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.pavement.details.road-length-type-id"),
      field: "road_length_type_id",
      renderCell: ({ row }: CellType) => {
        const name = roadLengthTypeMap.get(row.road_length_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.pavement.details.road-pavement-thickness"),
      field: "road_pavement_thickness",
      renderCell: ({ row }: CellType) => row.road_pavement_thickness?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.pavement.details.paved-road-surface-width"),
      field: "paved_road_surface_width",
      renderCell: ({ row }: CellType) => row.paved_road_surface_width?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("common.table-columns.created-at"),
      field: "created_at",
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>{formatCreatedAt(row.created_at)}</Typography>
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
            model="Pavement"
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
              subject: "pavement",
            }}
            editPermissionRule={{
              action: "update",
              subject: "pavement",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

