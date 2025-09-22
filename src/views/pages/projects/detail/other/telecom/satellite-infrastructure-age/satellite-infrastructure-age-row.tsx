"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { SatelliteInfrastructureAge } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: SatelliteInfrastructureAge;
}

export const satelliteInfrastructureAgeColumns = (
  onDetail: (satelliteInfrastructureAge: SatelliteInfrastructureAge) => void,
  onEdit: (satelliteInfrastructureAge: SatelliteInfrastructureAge) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  satelliteNetworkMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "satellite_network_id",
    headerName: t(
      "project.other.satellite-infrastructure-age.details.satellite-network",
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
        {satelliteNetworkMap.get(row?.satellite_network_id) ||
          t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.satellite-infrastructure-age.details.satellite",
    ),
    field: "satellite",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.satellite !== undefined
          ? `${row.satellite} ${t("common.years")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t(
      "project.other.satellite-infrastructure-age.details.ground-stations",
    ),
    field: "ground_stations",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.ground_stations !== undefined
          ? `${row.ground_stations} ${t("common.years")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.satellite-infrastructure-age.details.modems"),
    field: "modems",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.modems !== undefined
          ? `${row.modems} ${t("common.years")}`
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t("project.other.satellite-infrastructure-age.details.routers"),
    field: "routers",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.routers !== undefined
          ? `${row.routers} ${t("common.years")}`
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
          model="SatelliteInfrastructureAge"
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
            subject: "satelliteinfrastructureage",
          }}
          editPermissionRule={{
            action: "update",
            subject: "satelliteinfrastructureage",
          }}
        />
      </Fragment>
    ),
  },
];
