"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { BridgeBasicData } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: BridgeBasicData
}

export const bridgeBasicDataColumns = (
  onDetail: (bridgeBasicData: BridgeBasicData) => void,
  onEdit: (bridgeBasicData: BridgeBasicData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.bridge-basic-data.details.name"),
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
      headerName: t("project.other.bridge-basic-data.details.bridge-name"),
      field: "bridge_name",
      renderCell: ({ row }: CellType) => row.bridge_name || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-basic-data.details.bridge-number"),
      field: "bridge_number",
      renderCell: ({ row }: CellType) => row.bridge_number || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-basic-data.details.bridge-length"),
      field: "bridge_length",
      renderCell: ({ row }: CellType) => row.bridge_length?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-basic-data.details.bridge-width"),
      field: "bridge_width",
      renderCell: ({ row }: CellType) => row.bridge_width?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-basic-data.details.construction-year"),
      field: "construction_year",
      renderCell: ({ row }: CellType) => row.construction_year?.toString() || t("common.not-available"),
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
            model="BridgeBasicData"
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
              subject: "bridgebasicdata",
            }}
            editPermissionRule={{
              action: "update",
              subject: "bridgebasicdata",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

