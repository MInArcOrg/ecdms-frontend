"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { ReliabilityAndMaintenance } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: ReliabilityAndMaintenance
}

export const reliabilityAndMaintenanceColumns = (
  onDetail: (reliabilityAndMaintenance: ReliabilityAndMaintenance) => void,
  onEdit: (reliabilityAndMaintenance: ReliabilityAndMaintenance) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  maintenanceFrequencyMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "maintenance_frequency_id",
    headerName: t("project.other.reliability-and-maintenance.details.maintenance-frequency"),
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
        {row?.maintenance_frequency_id
          ? maintenanceFrequencyMap.get(row.maintenance_frequency_id) || t("common.not-available")
          : row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.reliability-and-maintenance.details.total-outage-duration"),
    field: "total_outage_duration",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.total_outage_duration !== undefined
          ? `${row.total_outage_duration} ${t("common.hours")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.reliability-and-maintenance.details.total-interruption-number"),
    field: "total_interruption_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.total_interruption_number !== undefined
          ? row.total_interruption_number
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.reliability-and-maintenance.details.saidi"),
    field: "saidi",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.saidi !== undefined ? row.saidi : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.reliability-and-maintenance.details.saifi"),
    field: "saifi",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.saifi !== undefined ? row.saifi : t("common.not-available")}
      </Typography>
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
          model="ReliabilityAndMaintenance"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: "delete",
            subject: "reliabilityandmaintenance",
          }}
          editPermissionRule={{
            action: "update",
            subject: "reliabilityandmaintenance",
          }}
        />
      </Fragment>
    ),
  },
]