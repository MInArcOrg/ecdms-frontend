"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { BridgeInspection } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: BridgeInspection
}

export const bridgeInspectionColumns = (
  onDetail: (bridgeInspection: BridgeInspection) => void,
  onEdit: (bridgeInspection: BridgeInspection) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  bridgePartDefectMap: Map<string, string>,
  damageTypeMap: Map<string, string>,
  damageConditionMap: Map<string, string>,
  hydrologyDefectMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.bridge-inspection.details.name"),
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
      headerName: t("project.other.bridge-inspection.details.bridge-name"),
      field: "bridge_name",
      renderCell: ({ row }: CellType) => row.bridge_name || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-inspection.details.bridge-part-defect-id"),
      field: "bridge_part_defect_id",
      renderCell: ({ row }: CellType) => {
        const name = bridgePartDefectMap.get(row.bridge_part_defect_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-inspection.details.damage-type-id"),
      field: "damage_type_id",
      renderCell: ({ row }: CellType) => {
        const name = damageTypeMap.get(row.damage_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-inspection.details.damage-condition-id"),
      field: "damage_condition_id",
      renderCell: ({ row }: CellType) => {
        const name = damageConditionMap.get(row.damage_condition_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-inspection.details.hydrology-defect-id"),
      field: "hydrology_defect_id",
      renderCell: ({ row }: CellType) => {
        const name = hydrologyDefectMap.get(row.hydrology_defect_id)
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
            model="BridgeInspection"
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
              subject: "bridgeinspection",
            }}
            editPermissionRule={{
              action: "update",
              subject: "bridgeinspection",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

