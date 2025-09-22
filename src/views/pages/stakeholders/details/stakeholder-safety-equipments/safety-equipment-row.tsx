import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { SafetyEquipment } from "src/types/stakeholder/stakeholder-safety-equipment";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: SafetyEquipment;
}

export const safetyEquipmentColumns = (
  onDetail: (equipment: SafetyEquipment) => void,
  onEdit: (equipment: SafetyEquipment) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t("stakeholder.safety-equipment.name"),
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
        {row.name}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "serial_no",
    headerName: t("stakeholder.safety-equipment.serial-no"),
    renderCell: ({ row }: CellType) =>
      row.serial_no || t("common.not-available"),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "brand_name",
    headerName: t("stakeholder.safety-equipment.brand-name"),
    renderCell: ({ row }: CellType) =>
      row.brand_name || t("common.not-available"),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "model",
    headerName: t("stakeholder.safety-equipment.model"),
    renderCell: ({ row }: CellType) => row.model,
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: "year",
    headerName: t("stakeholder.safety-equipment.year"),
    renderCell: ({ row }: CellType) => row.year || t("common.not-available"),
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: "quantity",
    headerName: t("stakeholder.safety-equipment.quantity"),
    renderCell: ({ row }: CellType) =>
      row.quantity || t("common.not-available"),
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: "created_at",
    headerName: t("common.created-at"),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at),
  },
  {
    minWidth: 150,
    sortable: false,
    field: "actions",
    headerName: t("common.table-columns.actions"),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="SafetyEquipment"
          model_id={row?.id || ""}
          refetchModel={() => {}}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || "")}
          item={row}
          deletePermissionRule={{
            action: "delete",
            subject: "safetyequipment",
          }}
          editPermissionRule={{
            action: "edit",
            subject: "safetyequipment",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
