"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { BridgeStructureInformation } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: BridgeStructureInformation
}

export const bridgeStructureInformationColumns = (
  onDetail: (bridgeStructureInformation: BridgeStructureInformation) => void,
  onEdit: (bridgeStructureInformation: BridgeStructureInformation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  bridgeStructureTypeMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.bridge-structure-information.details.name"),
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
      headerName: t("project.other.bridge-structure-information.details.bridge-name"),
      field: "bridge_name",
      renderCell: ({ row }: CellType) => row.bridge_name || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-structure-information.details.bridge-structure-type-id"),
      field: "bridge_structure_type_id",
      renderCell: ({ row }: CellType) => {
        const name = bridgeStructureTypeMap.get(row.bridge_structure_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-structure-information.details.east-region"),
      field: "east_region",
      renderCell: ({ row }: CellType) => row.east_region?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-structure-information.details.west-region"),
      field: "west_region",
      renderCell: ({ row }: CellType) => row.west_region?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.bridge-structure-information.details.central-region"),
      field: "central_region",
      renderCell: ({ row }: CellType) => row.central_region?.toString() || t("common.not-available"),
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
            model="BridgeStructureInformation"
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
              subject: "bridgestructureinformation",
            }}
            editPermissionRule={{
              action: "update",
              subject: "bridgestructureinformation",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

