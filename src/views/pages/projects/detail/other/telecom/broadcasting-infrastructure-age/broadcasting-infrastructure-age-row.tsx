"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { BroadcastingInfrastructureAge } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: BroadcastingInfrastructureAge;
}

export const broadcastingInfrastructureAgeColumns = (
  onDetail: (
    broadcastingInfrastructureAge: BroadcastingInfrastructureAge,
  ) => void,
  onEdit: (
    broadcastingInfrastructureAge: BroadcastingInfrastructureAge,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  broadcastingInfrastructureMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "broadcasting_infrastructure_id",
    headerName: t(
      "project.other.broadcasting-infrastructure-age.details.broadcasting-infrastructure",
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
        {broadcastingInfrastructureMap.get(
          row?.broadcasting_infrastructure_id,
        ) || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.broadcasting-infrastructure-age.details.name"),
    field: "name",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.name?.toString() || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.broadcasting-infrastructure-age.details.antennas",
    ),
    field: "antennas",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.antennas !== undefined
          ? `${row.antennas} ${t("common.years")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.broadcasting-infrastructure-age.details.transmitters",
    ),
    field: "transmitters",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.transmitters !== undefined
          ? `${row.transmitters} ${t("common.years")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.broadcasting-infrastructure-age.details.towers",
    ),
    field: "towers",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.towers !== undefined
          ? `${row.towers} ${t("common.years")}`
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
          model="BroadcastingInfrastructureAge"
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
            subject: "broadcastinginfrastructureage",
          }}
          editPermissionRule={{
            action: "update",
            subject: "broadcastinginfrastructureage",
          }}
        />
      </Fragment>
    ),
  },
];
