import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import { GeothermalPowerInfrastructure } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: GeothermalPowerInfrastructure;
}

export const geothermalPowerInfrastructureColumns = (
  onDetail: (
    geothermalPowerInfrastructure: GeothermalPowerInfrastructure,
  ) => void,
  onEdit: (
    geothermalPowerInfrastructure: GeothermalPowerInfrastructure,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.geothermal-power-infrastructure.details.turbine-manufacturer",
    ),
    field: "turbine_manufacturer",
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
        {row?.turbine_manufacturer || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.geothermal-power-infrastructure.details.turbine-model",
    ),
    field: "turbine_model",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.turbine_model || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.geothermal-power-infrastructure.details.turbine-type-id",
    ),
    field: "turbine_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.turbine_type_id || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.geothermal-power-infrastructure.details.each-turbine-capacity",
    ),
    field: "each_turbine_capacity",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.each_turbine_capacity?.toString() || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.geothermal-power-infrastructure.details.remark",
    ),
    field: "remark",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark || t("common.not-available")}
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
          model="GeothermalPowerInfrastructure"
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
          deletePermissionRule={{
            action: "delete",
            subject: "geothermalPowerInfrastructure",
          }}
          editPermissionRule={{
            action: "update",
            subject: "geothermalPowerInfrastructure",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
