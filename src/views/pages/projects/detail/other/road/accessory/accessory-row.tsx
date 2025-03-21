"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { Accessory } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: Accessory
}

export const accessoryColumns = (
  onDetail: (accessory: Accessory) => void,
  onEdit: (accessory: Accessory) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: "id",
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
        {row?.id.slice(0, 5)}...
      </Typography>
    ),
  },

  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.accessory.details.name"),
    field: "name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.name || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.accessory.details.under-passes"),
    field: "under_passes",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.under_passes || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.accessory.details.ramps"),
    field: "ramps",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.ramps || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.accessory.details.bridge"),
    field: "bridge",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.bridge ? t("common.yes") : t("common.no")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
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
          model="Accessory"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={(): void => {
            throw new Error("Function not implemented.")
          }}
          title=""
          postAction={(): void => {
            throw new Error("Function not implemented.")
          }}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: "delete",
            subject: "accessory",
          }}
          editPermissionRule={{
            action: "update",
            subject: "accessory",
          }}
        />
      </Fragment>
    ),
  },
]

