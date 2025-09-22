"use client";

import { Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { BroadcastingInfrastructure } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: BroadcastingInfrastructure;
}

export const broadcastingInfrastructureColumns = (
  onDetail: (broadcastingInfrastructure: BroadcastingInfrastructure) => void,
  onEdit: (broadcastingInfrastructure: BroadcastingInfrastructure) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  broadcastingInfrastructureTypeMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "broadcasting_infrastructure_type_id",
    headerName: t(
      "project.other.broadcasting-infrastructure.details.broadcasting-infrastructure-type",
    ),
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
        {broadcastingInfrastructureTypeMap.get(
          row?.broadcasting_infrastructure_type_id,
        ) || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.broadcasting-infrastructure.details.broadcasting-network",
    ),
    field: "broadcasting_network",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.broadcasting_network ? t("common.yes") : t("common.no")}
        color={row?.broadcasting_network ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.broadcasting-infrastructure.details.antennas"),
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
    minWidth: 100,
    headerName: t(
      "project.other.broadcasting-infrastructure.details.transmitters",
    ),
    field: "transmitters",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.transmitters ? t("common.yes") : t("common.no")}
        color={row?.transmitters ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("common.table-columns.created-at"),
    field: "created_at",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {formatCreatedAt(row.created_at)}
      </Typography>
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
          model="BroadcastingInfrastructure"
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
            subject: "broadcastinginfrastructure",
          }}
          editPermissionRule={{
            action: "update",
            subject: "broadcastinginfrastructure",
          }}
        />
      </Fragment>
    ),
  },
];
