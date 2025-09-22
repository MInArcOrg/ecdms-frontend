"use client";

import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { Fragment } from "react";
import type { ElectricGridControlCenterCyberSecurityData } from "src/types/project/other";
import { formatCreatedAt } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: ElectricGridControlCenterCyberSecurityData;
}

export const electricGridControlCenterCyberSecurityDataColumns = (
  onDetail: (
    electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData,
  ) => void,
  onEdit: (
    electricGridControlCenterCyberSecurityData: ElectricGridControlCenterCyberSecurityData,
  ) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  electricGridControlCenterDataMap: Map<string, string>,
  cyberSecurityMeasuresTypesMap: Map<string, string>,
  cyberSecurityAuditsFrequenciesMap: Map<string, string>,
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: "name",
    headerName: t(
      "project.other.electric-grid-control-center-cyber-security-data.details.name",
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
    flex: 0.2,
    minWidth: 150,
    headerName: t(
      "project.other.electric-grid-control-center-cyber-security-data.details.electric-grid-control-center-data-id",
    ),
    field: "electric_grid_control_center_data_id",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.electric_grid_control_center_data_id
          ? electricGridControlCenterDataMap.get(
              row.electric_grid_control_center_data_id,
            ) || row.electric_grid_control_center_data_id
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-measures-type",
    ),
    field: "cyber_security_measures_type",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.cyber_security_measures_type
          ? cyberSecurityMeasuresTypesMap.get(
              row.cyber_security_measures_type,
            ) || row.cyber_security_measures_type
          : t("common.not-available")}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t(
      "project.other.electric-grid-control-center-cyber-security-data.details.cyber-security-audits-frequency",
    ),
    field: "cyber_security_audits_frequency",
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.cyber_security_audits_frequency
          ? cyberSecurityAuditsFrequenciesMap.get(
              row.cyber_security_audits_frequency,
            ) || row.cyber_security_audits_frequency
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
          model="ElectricGridControlCenterCyberSecurityData"
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
            subject: "electricgridcontrolcentercybersecuritydata",
          }}
          editPermissionRule={{
            action: "update",
            subject: "electricgridcontrolcentercybersecuritydata",
          }}
        />
      </Fragment>
    ),
  },
];
