import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { RailwaySleeperMaintenanceAndReplacement } from "src/types/project/other";
import { formatDynamicDate } from "src/utils/formatter/date";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RailwaySleeperMaintenanceAndReplacement;
}

export const railwaySleeperMaintenanceAndReplacementColumns = (
  onDetail: (row: RailwaySleeperMaintenanceAndReplacement) => void,
  onEdit: (row: RailwaySleeperMaintenanceAndReplacement) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: "project_id",
    headerName: t("common.table-columns.id"),
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
        {row?.project_id || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: "railway_line_section_name",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.railway_line_section_name",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.railway_line_section_name || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: "scheduled_maintenance_activities",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.scheduled_maintenance_activities",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.scheduled_maintenance_activities || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: "recent_maintenance_date",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.recent_maintenance_date",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.recent_maintenance_date
          ? formatDynamicDate(row?.recent_maintenance_date)
          : "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: "inspection_reports",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.inspection_reports",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.inspection_reports || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: "sleeper_replacement_history",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.sleeper_replacement_history",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.sleeper_replacement_history || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "remark",
    headerName: t(
      "project.other.railway-sleeper-maintenance-and-replacement.details.remark",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark || "N/A"}
      </Typography>
    ),
  },
  {
    field: "actions",
    headerName: t("common.table-columns.actions"),
    minWidth: 180,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        <ModelAction
          model="RailwaySleeperMaintenanceAndReplacement"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwaysleepermaintenanceandreplacement",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwaysleepermaintenanceandreplacement",
          }}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      </>
    ),
  },
];
