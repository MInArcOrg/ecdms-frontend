"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { SubstationTransformerAndSwitchgearData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: SubstationTransformerAndSwitchgearData;
}

export const substationTransformerAndSwitchgearDataColumns = (
  onDetail: (
    substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData,
  ) => void,
  onEdit: (
    substationTransformerAndSwitchgearData: SubstationTransformerAndSwitchgearData,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.substation-transformer-and-switchgear-data.details.name",
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
        {row?.name || row?.id.slice(0, 8) + "..."}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.substation-transformer-and-switchgear-data.details.transformer-type",
    ),
    field: "transformer_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.transformer_type || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.substation-transformer-and-switchgear-data.details.transformers-number",
    ),
    field: "transformers_number",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.transformers_number !== undefined
          ? row.transformers_number
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.substation-transformer-and-switchgear-data.details.transformer-capacity",
    ),
    field: "transformer_capacity",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.transformer_capacity !== undefined
          ? `${row.transformer_capacity} ${t("common.mva")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.substation-transformer-and-switchgear-data.details.input-voltage-level",
    ),
    field: "input_voltage_level",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.input_voltage_level !== undefined
          ? `${row.input_voltage_level} ${t("common.kv")}`
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
          model="SubstationTransformerAndSwitchgearData"
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
            subject: "substationtransformerandswitchgeardata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "substationtransformerandswitchgeardata",
          }}
        />
      </Fragment>
    ),
  },
];
