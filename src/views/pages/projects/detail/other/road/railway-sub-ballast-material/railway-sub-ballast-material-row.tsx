import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { RailwaySubBallastMaterial } from "src/types/project/other"; // Updated import
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";

interface CellType {
  row: RailwaySubBallastMaterial; // Updated interface
}

export const railwaySubBallastMaterialColumns = (
  // Updated export name
  onDetail: (row: RailwaySubBallastMaterial) => void, // Updated type
  onEdit: (row: RailwaySubBallastMaterial) => void, // Updated type
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
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
        {row.id || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: "railway_line_section_name",
    headerName: t(
      "project.other.railway-sub-ballast-material.details.railway-line-section-name",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.railway_line_section_name || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "sub_ballast_material_type_id", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.sub-ballast-material-type-id",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.sub_ballast_material_type_id || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "layer_thickness", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.layer-thickness",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.layer_thickness ?? "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "layer_depth", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.layer-depth",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.layer_depth ?? "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: "density", // New field
    headerName: t("project.other.railway-sub-ballast-material.details.density"), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.density ?? "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: "moisture_content", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.moisture-content",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.moisture_content ?? "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "method_used_for_compaction", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.method-used-for-compaction",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.method_used_for_compaction || "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: "compaction_density", // New field
    headerName: t(
      "project.other.railway-sub-ballast-material.details.compaction-density",
    ), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.compaction_density ?? "N/A"}
      </Typography>
    ),
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: "remark",
    headerName: t("project.other.railway-sub-ballast-material.details.remark"), // Updated translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: "text.secondary" }}>
        {row.remark || "N/A"}
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
          model="RailwaySubBallastMaterial" // Updated model name
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: "delete",
            subject: "railwaysubballastmaterial",
          }} // Updated subject
          editPermissionRule={{
            action: "update",
            subject: "railwaysubballastmaterial",
          }} // Updated subject
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      </>
    ),
  },
];
