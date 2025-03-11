"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { RoadDrainage } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: RoadDrainage
}

export const roadDrainageColumns = (
  onDetail: (roadDrainage: RoadDrainage) => void,
  onEdit: (roadDrainage: RoadDrainage) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  currentConditionMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.road-drainage.details.name"),
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
      headerName: t("project.other.road-drainage.details.length"),
      field: "length",
      renderCell: ({ row }: CellType) => row.length?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-drainage.details.height"),
      field: "height",
      renderCell: ({ row }: CellType) => row.height?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-drainage.details.width"),
      field: "width",
      renderCell: ({ row }: CellType) => row.width?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-drainage.details.current-condition-id"),
      field: "current_condition_id",
      renderCell: ({ row }: CellType) => {
        const name = currentConditionMap.get(row.current_condition_id)
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
            model="RoadDrainage"
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
              subject: "roaddrainage",
            }}
            editPermissionRule={{
              action: "update",
              subject: "roaddrainage",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

