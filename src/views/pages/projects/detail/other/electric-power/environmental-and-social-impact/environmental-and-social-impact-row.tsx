"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { EnvironmentalAndSocialImpact } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: EnvironmentalAndSocialImpact;
}

export const environmentalAndSocialImpactColumns = (
  onDetail: (
    environmentalAndSocialImpact: EnvironmentalAndSocialImpact,
  ) => void,
  onEdit: (environmentalAndSocialImpact: EnvironmentalAndSocialImpact) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.25,
    minWidth: 200,
    field: "environmental_impact_assessment_conducted",
    headerName: t(
      "project.other.environmental-and-social-impact.details.environmental-impact-assessment-conducted",
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
        {row?.environmental_impact_assessment_conducted
          ? t("common.yes")
          : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.environmental-and-social-impact.details.mitigation-measures-implemented",
    ),
    field: "mitigation_measures_implemented",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.mitigation_measures_implemented
          ? t("common.yes")
          : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.environmental-and-social-impact.details.social-impact-assessment-conducted",
    ),
    field: "social_impact_assessment_conducted",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.social_impact_assessment_conducted
          ? t("common.yes")
          : t("common.no")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t(
      "project.other.environmental-and-social-impact.details.resettlement-and-compensation-measures-implemented",
    ),
    field: "resettlement_and_compensation_measures_implemented",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.resettlement_and_compensation_measures_implemented
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
          model="EnvironmentalAndSocialImpact"
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
            subject: "environmentalandsocialimpact",
          }}
          editPermissionRule={{
            action: "update",
            subject: "environmentalandsocialimpact",
          }}
        />
      </Fragment>
    ),
  },
];
