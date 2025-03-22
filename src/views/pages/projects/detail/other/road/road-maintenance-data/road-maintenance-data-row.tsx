"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { RoadMaintenanceData } from "src/types/project/other"
import { formatCreatedAt, formatDate } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: RoadMaintenanceData
}

export const roadMaintenanceDataColumns = (
  onDetail: (roadMaintenanceData: RoadMaintenanceData) => void,
  onEdit: (roadMaintenanceData: RoadMaintenanceData) => void,
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
    headerName: t("project.other.road-maintenance-data.details.road-segment"),
    field: "road_segment",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.road_segment || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.road-maintenance-data.details.maintenance-start-date"),
    field: "maintenance_start_date",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.maintenance_start_date ? formatDate(row.maintenance_start_date) : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.road-maintenance-data.details.maintenance-end-date"),
    field: "maintenance_end_date",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.maintenance_end_date ? formatDate(row.maintenance_end_date) : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.road-maintenance-data.details.weather-condition"),
    field: "weather_condition",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.weather_condition || t("common.not-available")}</Typography>
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
          model="RoadMaintenanceData"
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
            subject: "roadmaintenancedata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "roadmaintenancedata",
          }}
        />
      </Fragment>
    ),
  },
]

