"use client";

import { Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { InternetConnection } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: InternetConnection;
}

export const internetConnectionColumns = (
  onDetail: (internetConnection: InternetConnection) => void,
  onEdit: (internetConnection: InternetConnection) => void,
  onDelete: ((id: string) => void) | null, // Made optional for CRU
  t: any,
  refetch: () => void,
  internetConnectionTypeMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "internet_connection_type_id",
    headerName: t(
      "project.other.internet-connection.details.internet-connection-type",
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
        {internetConnectionTypeMap.get(row?.internet_connection_type_id) ||
          t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.internet-connection.details.routers"),
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
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.internet-connection.details.switches"),
    field: "switches",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.switches ? t("common.yes") : t("common.no")}
        color={row?.switches ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.internet-connection.details.modems"),
    field: "modems",
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.modems ? t("common.yes") : t("common.no")}
        color={row?.modems ? "success" : "default"}
      />
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.internet-connection.details.cables"),
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
          model="InternetConnection"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          item={row}
          options={[]}
          editPermissionRule={{
            action: "update",
            subject: "internetconnection",
          }}
        />
      </Fragment>
    ),
  },
];
