import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import { DataCenter } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: DataCenter;
}

export const dataCenterColumns = (
  onDetail: (dataCenter: DataCenter) => void,
  onEdit: (dataCenter: DataCenter) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: "id",
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
        {row?.id.slice(0, 5)}...
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.data-center-type-id"),
    field: "data_center_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.data_center_type_id || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.servers"),
    field: "servers",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.servers ? t("common.yes") : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.storage-devices"),
    field: "storage_devices",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.storage_devices ? t("common.yes") : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.networking-equipment"),
    field: "networking_equipment",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.networking_equipment ? t("common.yes") : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.cooling-systems"),
    field: "cooling_systems",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.cooling_systems ? t("common.yes") : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.backup-generators"),
    field: "backup_generators",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.backup_generators ? t("common.yes") : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.data-center.details.others"),
    field: "others",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.others || t("common.not-available")}
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
          model="DataCenter"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={function (): void {
            throw new Error("Function not implemented.");
          }}
          title=""
          postAction={function (): void {
            throw new Error("Function not implemented.");
          }}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: "delete",
            subject: "datacenter",
          }}
          editPermissionRule={{
            action: "update",
            subject: "datacenter",
          }}
        />
      </Fragment>
    ),
  },
];
