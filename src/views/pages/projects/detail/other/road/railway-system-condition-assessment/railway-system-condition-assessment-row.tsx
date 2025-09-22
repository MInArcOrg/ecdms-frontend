import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwaySystemConditionAssessment } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RailwaySystemConditionAssessment;
}

export const railwaySystemConditionAssessmentColumns = (
  onDetail: (row: RailwaySystemConditionAssessment) => void,
  onEdit: (row: RailwaySystemConditionAssessment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
): GridColDef[] => [
  {
    flex: 0.1,
    minWidth: 80,
    field: "id",
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
        {row?.id?.toString().slice(0, 5) || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: "railway_line_section_name",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.railway_line_section_name",
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
    field: "system_condition_rating_or_assessment",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.system_condition_rating_or_assessment",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.system_condition_rating_or_assessment || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "defect_presence",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.defect_presence",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.defect_presence ? "Yes" : "No"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "system_performance_indicators",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.system_performance_indicators",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.system_performance_indicators || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 250,
    field: "power_supply_systems_and_communication",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.power_supply_systems_and_communication",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.power_supply_systems_and_communication || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "remark",
    headerName: t(
      "project.other.railway-system-condition-assessment.details.remark",
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row?.remark || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: "default_files",
    headerName: t("common.table-columns.files"),
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.id || ""} />}</>
    ),
  },
  {
    field: "actions",
    headerName: t("common.table-columns.actions"),
    minWidth: 250,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        <ModelAction
          model="RailwaySystemConditionAssessment"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwaysystemconditionassessment",
          }}
          editPermissionRule={{
            action: "update",
            subject: "railwaysystemconditionassessment",
          }}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id as string)}
          item={row}
          options={[]}
        />
      </>
    ),
  },
];
