"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { SolarPanel } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: SolarPanel
}

export const solarPanelColumns = (
  onDetail: (solarPanel: SolarPanel) => void,
  onEdit: (solarPanel: SolarPanel) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  solarPanelTypeMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "manufacturer",
    headerName: t("project.other.solar-panel.details.manufacturer"),
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
        {row?.manufacturer || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.solar-panel.details.model"),
    field: "model",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.model || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t("project.other.solar-panel.details.solar-panel-type"),
    field: "solar_panel_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {solarPanelTypeMap.get(row?.solar_panel_type_id) || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.solar-panel.details.solar-panels-number"),
    field: "solar_panels_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.solar_panels_number !== undefined ? row.solar_panels_number : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.solar-panel.details.each-solar-panel-capacity"),
    field: "each_solar_panel_capacity",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.each_solar_panel_capacity !== undefined
          ? `${row.each_solar_panel_capacity} ${t("common.watts")}`
          : t("common.not-available")}
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
          model="SolarPanel"
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
            subject: "solarpanel",
          }}
          editPermissionRule={{
            action: "update",
            subject: "solarpanel",
          }}
        />
      </Fragment>
    ),
  },
]

