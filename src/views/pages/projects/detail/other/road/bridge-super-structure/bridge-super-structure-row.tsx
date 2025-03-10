"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { BridgeSuperStructure } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: BridgeSuperStructure
}

export const bridgeSuperStructureColumns = (
  onDetail: (bridgeSuperStructure: BridgeSuperStructure) => void,
  onEdit: (bridgeSuperStructure: BridgeSuperStructure) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  bridgeStructureTypeMap: Map<string, string>,
  spanSupportTypeMap: Map<string, string>,
  deckSlabTypeMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.bridge-super-structure.details.name"),
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
      headerName: t("project.other.bridge-super-structure.details.bridge-name"),
      field: "bridge_name",
      renderCell: ({ row }: CellType) => row.bridge_name || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-super-structure.details.bridge-structure-type-id"),
      field: "bridge_structure_type_id",
      renderCell: ({ row }: CellType) => {
        const name = bridgeStructureTypeMap.get(row.bridge_structure_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-super-structure.details.span-number"),
      field: "span_number",
      renderCell: ({ row }: CellType) => row.span_number?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-super-structure.details.span-support-type-id"),
      field: "span_support_type_id",
      renderCell: ({ row }: CellType) => {
        const name = spanSupportTypeMap.get(row.span_support_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-super-structure.details.deck-slab-type-id"),
      field: "deck_slab_type_id",
      renderCell: ({ row }: CellType) => {
        const name = deckSlabTypeMap.get(row.deck_slab_type_id)
        return name || t("common.not-available")
      },
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
            model="BridgeSuperStructure"
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
              subject: "bridgesuperstructure",
            }}
            editPermissionRule={{
              action: "update",
              subject: "bridgesuperstructure",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

