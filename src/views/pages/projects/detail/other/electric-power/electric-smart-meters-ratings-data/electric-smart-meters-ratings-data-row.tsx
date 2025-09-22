"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { ElectricSmartMetersRatingsData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ElectricSmartMetersRatingsData;
}

export const electricSmartMetersRatingsDataColumns = (
  onDetail: (
    electricSmartMetersRatingsData: ElectricSmartMetersRatingsData,
  ) => void,
  onEdit: (
    electricSmartMetersRatingsData: ElectricSmartMetersRatingsData,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  electricSmartMetersDataMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.electric-smart-meters-ratings-data.details.name",
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
      "project.other.electric-smart-meters-ratings-data.details.electric-smart-meters-data-id",
    ),
    field: "electric_smart_meters_data_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.electric_smart_meters_data_id
          ? electricSmartMetersDataMap.get(row.electric_smart_meters_data_id) ||
            row.electric_smart_meters_data_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-smart-meters-ratings-data.details.active-reactive",
    ),
    field: "active_reactive",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.active_reactive || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-smart-meters-ratings-data.details.phase",
    ),
    field: "phase",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.phase || t("common.not-available")}
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
          model="ElectricSmartMetersRatingsData"
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
            subject: "electricsmartmetersratingsdata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "electricsmartmetersratingsdata",
          }}
        />
      </Fragment>
    ),
  },
];
