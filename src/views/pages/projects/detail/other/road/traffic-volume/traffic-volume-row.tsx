"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { TrafficVolume } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: TrafficVolume
}

export const trafficVolumeColumns = (
  onDetail: (trafficVolume: TrafficVolume) => void,
  onEdit: (trafficVolume: TrafficVolume) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  countTypeMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.traffic-volume.details.name"),
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
      headerName: t("project.other.traffic-volume.details.count-type-id"),
      field: "count_type_id",
      renderCell: ({ row }: CellType) => {
        const name = countTypeMap.get(row.count_type_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-volume.details.count-time"),
      field: "count_time",
      renderCell: ({ row }: CellType) => (row.count_time ? formatCreatedAt(row.count_time) : t("common.not-available")),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-volume.details.lane-number"),
      field: "lane_number",
      renderCell: ({ row }: CellType) => row.lane_number?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-volume.details.vehicle-number-per-hour"),
      field: "vehicle_number_per_hour",
      renderCell: ({ row }: CellType) => row.vehicle_number_per_hour?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-volume.details.average-daily-traffic-volume"),
      field: "average_daily_traffic_volume",
      renderCell: ({ row }: CellType) => row.average_daily_traffic_volume?.toString() || t("common.not-available"),
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
            model="TrafficVolume"
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
              subject: "trafficvolume",
            }}
            editPermissionRule={{
              action: "update",
              subject: "trafficvolume",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

