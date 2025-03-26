"use client"

import { Button } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { TransmissionLineEquipmentData } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: TransmissionLineEquipmentData
}

export const transmissionLineEquipmentDataColumns = (
  onDetail: (transmissionLineEquipmentData: TransmissionLineEquipmentData) => void,
  onEdit: (transmissionLineEquipmentData: TransmissionLineEquipmentData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t("project.other.transmission-line-equipment-data.details.name"),
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
        {row?.name || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.transmission-line-equipment-data.details.insulator-type"),
    field: "insulator_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.insulator_type || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.transmission-line-equipment-data.details.ground-wire-type"),
    field: "ground_wire_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.ground_wire_type || t("common.not-available")}</Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.transmission-line-equipment-data.details.fiber-optics-number"),
    field: "fiber_optics_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.fiber_optics_number !== undefined ? row.fiber_optics_number : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.transmission-line-equipment-data.details.tower-grounding"),
    field: "tower_grounding",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>{row?.tower_grounding || t("common.not-available")}</Typography>
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
          model="TransmissionLineEquipmentData"
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
            subject: "transmissionlineequipmentdata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "transmissionlineequipmentdata",
          }}
        />
      </Fragment>
    ),
  },
]

