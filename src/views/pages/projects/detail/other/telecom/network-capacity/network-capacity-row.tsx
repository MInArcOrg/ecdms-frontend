"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { NetworkCapacity } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: NetworkCapacity;
}

export const networkCapacityColumns = (
  onDetail: (networkCapacity: NetworkCapacity) => void,
  onEdit: (networkCapacity: NetworkCapacity) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  networkTypeMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "network_type_id",
    headerName: t("project.other.network-capacity.details.network-type"),
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
        {networkTypeMap.get(row?.network_type_id) || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.network-capacity.details.total-bandwidth"),
    field: "total_bandwidth",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.total_bandwidth !== undefined
          ? `${row.total_bandwidth} Mbps`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.network-capacity.details.users-number"),
    field: "users_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.users_number !== undefined
          ? row.users_number
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t("project.other.network-capacity.details.remark"),
    field: "remark",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark
          ? row.remark.length > 30
            ? row.remark.substring(0, 30) + "..."
            : row.remark
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
          model="NetworkCapacity"
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
            subject: "networkcapacity",
          }}
          editPermissionRule={{
            action: "update",
            subject: "networkcapacity",
          }}
        />
      </Fragment>
    ),
  },
];
