"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { RegulationAndPolicy } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RegulationAndPolicy;
}

export const regulationAndPolicyColumns = (
  onDetail: (regulationAndPolicy: RegulationAndPolicy) => void,
  onEdit: (regulationAndPolicy: RegulationAndPolicy) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.25,
    minWidth: 200,
    field: "regulatory_body_overseeing_the_facility",
    headerName: t(
      "project.other.regulation-and-policy.details.regulatory-body-overseeing-the-facility",
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
        {row?.regulatory_body_overseeing_the_facility ||
          row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.regulation-and-policy.details.regulatory-compliance-monitoring",
    ),
    field: "regulatory_compliance_monitoring",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.regulatory_compliance_monitoring
          ? t("common.yes")
          : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.regulation-and-policy.details.environmental-and-social-regulation-compliance-monitoring",
    ),
    field: "environmental_and_social_regulation_compliance_monitoring",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.environmental_and_social_regulation_compliance_monitoring
          ? t("common.yes")
          : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.regulation-and-policy.details.licensing-and-permit-requirements",
    ),
    field: "licensing_and_permit_requirements",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.licensing_and_permit_requirements
          ? t("common.yes")
          : t("common.no")}
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
          model="RegulationAndPolicy"
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
            subject: "regulationandpolicy",
          }}
          editPermissionRule={{
            action: "update",
            subject: "regulationandpolicy",
          }}
        />
      </Fragment>
    ),
  },
];
