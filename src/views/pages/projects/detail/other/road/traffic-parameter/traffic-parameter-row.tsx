"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { TrafficParameter } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: TrafficParameter
}

export const trafficParameterColumns = (
  onDetail: (trafficParameter: TrafficParameter) => void,
  onEdit: (trafficParameter: TrafficParameter) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  pedestrianFacilityMap: Map<string, string>,
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t("project.other.traffic-parameter.details.name"),
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
      headerName: t("project.other.traffic-parameter.details.pedestrian-facility-id"),
      field: "pedestrian_facility_id",
      renderCell: ({ row }: CellType) => {
        const name = pedestrianFacilityMap.get(row.pedestrian_facility_id)
        return name || t("common.not-available")
      },
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-parameter.details.parking"),
      field: "parking",
      renderCell: ({ row }: CellType) => row.parking?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-parameter.details.design-traffic-flow"),
      field: "design_traffic_flow",
      renderCell: ({ row }: CellType) => row.design_traffic_flow?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-parameter.details.design-speed"),
      field: "design_speed",
      renderCell: ({ row }: CellType) => row.design_speed?.toString() || t("common.not-available"),
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t("project.other.traffic-parameter.details.similar-for-all"),
      field: "similar_for_all",
      renderCell: ({ row }: CellType) => (row.similar_for_all ? t("common.yes") : t("common.no")),
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
            model="TrafficParameter"
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
              subject: "trafficparameter",
            }}
            editPermissionRule={{
              action: "update",
              subject: "trafficparameter",
            }}
            options={[]}
          />
        </Fragment>
      ),
    },
  ]
}

