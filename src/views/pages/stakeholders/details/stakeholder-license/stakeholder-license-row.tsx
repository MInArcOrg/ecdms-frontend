import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { StakeholderLicense } from "src/types/stakeholder/stakeholder-license";
import { formatCreatedAt, formatDynamicDate } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: StakeholderLicense;
}

export const licenseColumns = (
  onDetail: (license: StakeholderLicense) => void,
  onEdit: (license: StakeholderLicense) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.18,
    minWidth: 180,
    field: "license_type",
    headerName: t("stakeholder.stakeholder-license.form.license-type"),
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
        {row.license_type || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.14,
    minWidth: 120,
    field: "license_category",
    headerName: t("stakeholder.stakeholder-license.form.license-category"),
    renderCell: ({ row }: CellType) =>
      row.license_category || t("common.not-available"),
  },
  {
    flex: 0.16,
    minWidth: 140,
    field: "license_name",
    headerName: t("stakeholder.stakeholder-license.form.license-name"),
    renderCell: ({ row }: CellType) =>
      row.license_name || t("common.not-available"),
  },
  {
    flex: 0.16,
    minWidth: 140,
    field: "license_scope",
    headerName: t("stakeholder.stakeholder-license.form.license-scope"),
    renderCell: ({ row }: CellType) =>
      row.license_scope || t("common.not-available"),
  },
  {
    flex: 0.16,
    minWidth: 140,
    field: "licensing_body",
    headerName: t("stakeholder.stakeholder-license.form.licensing-body"),
    renderCell: ({ row }: CellType) =>
      row.licensing_body || t("common.not-available"),
  },
  {
    flex: 0.14,
    minWidth: 120,
    field: "license_number",
    headerName: t("stakeholder.stakeholder-license.form.license-number"),
    renderCell: ({ row }: CellType) =>
      row.license_number || t("common.not-available"),
  },
  {
    flex: 0.14,
    minWidth: 120,
    field: "issue_date",
    headerName: t("stakeholder.stakeholder-license.form.issue-date"),
    renderCell: ({ row }: CellType) =>
      formatDynamicDate(row.issue_date) || t("common.not-available"),
  },
  {
    flex: 0.14,
    minWidth: 120,
    field: "expire_date",
    headerName: t("stakeholder.stakeholder-license.form.expire-date"),
    renderCell: ({ row }: CellType) =>
      formatDynamicDate(row.expire_date) || t("common.not-available"),
  },
  {
    flex: 0.16,
    minWidth: 140,
    field: "remark",
    headerName: t("stakeholder.stakeholder-license.form.remark"),
    renderCell: ({ row }: CellType) => row.remark || t("common.not-available"),
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
          model="StakeholderLicense"
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
            subject: "stakeholderlicense",
          }}
          editPermissionRule={{
            action: "update",
            subject: "stakeholderlicense",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
