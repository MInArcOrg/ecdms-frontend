import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { ProfessionalCertification } from "src/types/resource";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ProfessionalCertification;
}

export const certificationColumns = (
  onDetail: (certification: ProfessionalCertification) => void,
  onEdit: (certification: ProfessionalCertification) => void,
  onDelete: (id: string) => void,
  t: any,
): GridColDef[] => [
  {
    flex: 0.25,
    minWidth: 250,
    field: "certificate_title",
    headerName: t("resources.professional.certification.certificate-title"),
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
        {row.certificate_title}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: "certification_type",
    headerName: t("resources.professional.certification.certification-type"),
    renderCell: ({ row }: CellType) =>
      row.certification_type || t("common.not-available"),
  },
  {
    flex: 0.2,
    minWidth: 160,
    field: "certifying_body",
    headerName: t("resources.professional.certification.certifying-body"),
    renderCell: ({ row }: CellType) =>
      row.certifying_body || t("common.not-available"),
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
          model="ProfessionalCertification"
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
            subject: "professionalcertification",
          }}
          editPermissionRule={{
            action: "update",
            subject: "professionalcertification",
          }}
          options={[]}
        />
      </Fragment>
    ),
  },
];
