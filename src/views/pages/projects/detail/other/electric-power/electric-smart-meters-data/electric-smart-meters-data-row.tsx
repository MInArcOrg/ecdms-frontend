"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { ElectricSmartMetersData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ElectricSmartMetersData;
}

export const electricSmartMetersDataColumns = (
  onDetail: (electricSmartMetersData: ElectricSmartMetersData) => void,
  onEdit: (electricSmartMetersData: ElectricSmartMetersData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  miniGridStationsMap: Map<string, string>,
  smartMeterModelsMap: Map<string, string>,
  smartMeterTypesMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t("project.other.electric-smart-meters-data.details.name"),
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
      "project.other.electric-smart-meters-data.details.mini-grid-station-id",
    ),
    field: "mini_grid_station_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.mini_grid_station_id
          ? miniGridStationsMap.get(row.mini_grid_station_id) ||
            row.mini_grid_station_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-smart-meters-data.details.facility-type",
    ),
    field: "facility_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.facility_type || t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t("project.other.electric-smart-meters-data.details.model-id"),
    field: "model_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.model_id
          ? smartMeterModelsMap.get(row.model_id) || row.model_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-smart-meters-data.details.smart-meter-type-id",
    ),
    field: "smart_meter_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.smart_meter_type_id
          ? smartMeterTypesMap.get(row.smart_meter_type_id) ||
            row.smart_meter_type_id
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
          model="ElectricSmartMetersData"
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
            subject: "electricsmartmetersdata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "electricsmartmetersdata",
          }}
        />
      </Fragment>
    ),
  },
];
