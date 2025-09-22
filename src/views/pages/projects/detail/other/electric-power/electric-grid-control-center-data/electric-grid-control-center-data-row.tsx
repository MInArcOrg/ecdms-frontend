"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { ElectricGridControlCenterData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ElectricGridControlCenterData;
}

export const electricGridControlCenterDataColumns = (
  onDetail: (
    electricGridControlCenterData: ElectricGridControlCenterData,
  ) => void,
  onEdit: (
    electricGridControlCenterData: ElectricGridControlCenterData,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  miniGridStationsMap: Map<string, string>,
  controlSystemTypesMap: Map<string, string>,
  communicationLinksMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.electric-grid-control-center-data.details.name",
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
      "project.other.electric-grid-control-center-data.details.mini-grid-station-id",
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
      "project.other.electric-grid-control-center-data.details.control-system-type-id",
    ),
    field: "control_system_type_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.control_system_type_id
          ? controlSystemTypesMap.get(row.control_system_type_id) ||
            row.control_system_type_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-grid-control-center-data.details.installation-year",
    ),
    field: "installation_year",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.installation_year !== undefined
          ? row.installation_year
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
          model="ElectricGridControlCenterData"
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
            subject: "electricgridcontrolcenterdata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "electricgridcontrolcenterdata",
          }}
        />
      </Fragment>
    ),
  },
];
