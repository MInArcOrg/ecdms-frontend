"use client"

import { Button, Chip } from "@mui/material"
import Typography from "@mui/material/Typography"
import type { GridColDef } from "@mui/x-data-grid"
import { Fragment } from "react"
import type { TelecomInfrastructureAge } from "src/types/project/other"
import { formatCreatedAt } from "src/utils/formatter/date"
import ModelAction from "src/views/components/custom/model-actions"
import RowOptions from "src/views/shared/listing/row-options"

interface CellType {
  row: TelecomInfrastructureAge
}

export const telecomInfrastructureAgeColumns = (
  onDetail: (telecomInfrastructureAge: TelecomInfrastructureAge) => void,
  onEdit: (telecomInfrastructureAge: TelecomInfrastructureAge) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: "id",
    headerName: t("common.table-columns.id"),
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
        {row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t("project.other.telecom-infrastructure-age.details.cables"),
    field: "cables",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.cables ? t("common.yes") : t("common.no")}
        color={row?.cables ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t("project.other.telecom-infrastructure-age.details.wires"),
    field: "wires",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.wires ? t("common.yes") : t("common.no")}
        color={row?.wires ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t("project.other.telecom-infrastructure-age.details.routers"),
    field: "routers",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.routers ? t("common.yes") : t("common.no")}
        color={row?.routers ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t("project.other.telecom-infrastructure-age.details.antennas"),
    field: "antennas",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.antennas ? t("common.yes") : t("common.no")}
        color={row?.antennas ? "success" : "default"}
      />
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
          model="TelecomInfrastructureAge"
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
            subject: "telecominfrastructureage",
          }}
          editPermissionRule={{
            action: "update",
            subject: "telecominfrastructureage",
          }}
        />
      </Fragment>
    ),
  },
]

