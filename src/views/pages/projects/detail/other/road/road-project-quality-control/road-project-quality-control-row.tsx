"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { RoadProjectQualityControl } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: RoadProjectQualityControl
}

export const roadProjectQualityControlColumns = (
  onDetail: (roadProjectQualityControl: RoadProjectQualityControl) => void,
  onEdit: (roadProjectQualityControl: RoadProjectQualityControl) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  projectPhaseMap: Map<string, string>,
  inspectionTypeMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.road-project-quality-control.details.name"),
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
      headerName: t("project.other.road-project-quality-control.details.project-phase-id"),
      field: "project_phase_id",
      renderCell: ({ row }: CellType) => {
        const name = projectPhaseMap.get(row.project_phase_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-project-quality-control.details.inspection-type-id"),
      field: "inspection_type_id",
      renderCell: ({ row }: CellType) => {
        const name = inspectionTypeMap.get(row.inspection_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.road-project-quality-control.details.defect-encountered"),
      field: "defect_encountered",
      renderCell: ({ row }: CellType) => row.defect_encountered || t("common.not-available"),
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
            model="RoadProjectQualityControl"
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
              subject: "roadprojectqualitycontrol",
            }}
            editPermissionRule={{
              action: "update",
              subject: "roadprojectqualitycontrol",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

