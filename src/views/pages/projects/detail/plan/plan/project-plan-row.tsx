import { Autocomplete, Box, Button, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import { GridColDef, GridColumnHeaderParams } from "@mui/x-data-grid";
import Link from "next/link";
import { Fragment, useState } from "react";
import CustomTextField from "src/@core/components/mui/text-field";
import { yearListOptions } from "src/constants/project-plan-constants";
import { ProjectPlan } from "src/types/project/project-plan";
import { formatCurrency } from "src/utils/formatter/currency";
import { formatCreatedAt, formatDate } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ProjectPlan;
}

export const projectPlanColumns = (
  onDetail: (projectPlan: ProjectPlan) => void,
  onEdit: (projectPlan: ProjectPlan) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) => {
  const [selectedYear, setSelectedYear] = useState<{
    label: string;
    value: string;
  }>();
  return [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t("project.plan.columns.type"),
      field: "type",
      renderCell: ({ row }: CellType) => {
        return (
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
            {`Q${row.quarter}/${formatDate(row.start, 'yyyy')}`}
          </Typography>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t("project.plan.columns.financial-performance"),
      field: "year",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {formatCurrency(Number(row.financial_performance)) ?? t("N/A")}
          </Typography>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t("project.plan.columns.physical-performance"),
      field: "quarter",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {formatCurrency(Number(row.physical_performance)) ?? t("N/A")}
          </Typography>
        );
      },
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t("project.plan.columns.project-expense"),
      field: "project_expense",
      renderCell: ({ row }: CellType) => {
        return (
          <Typography sx={{ color: "text.secondary" }}>
            {formatCurrency(Number(row.project_expense)) ?? t("N/A")}
          </Typography>
        );
      },
    },

    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: "actions",
      headerName: t("common.table-columns.actions"),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="ProjectPlan"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </Fragment>
      ),
    },
  ] as GridColDef[];
};
