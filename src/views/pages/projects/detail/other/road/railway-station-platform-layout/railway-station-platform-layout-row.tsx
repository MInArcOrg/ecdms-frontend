import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayStationPlatformLayout } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface CellType {
  row: RailwayStationPlatformLayout;
}

export const railwayStationPlatformLayoutColumns = (
  onDetail: (row: RailwayStationPlatformLayout) => void,
  onEdit: (row: RailwayStationPlatformLayout) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 150,
      field: "name",
      headerName: t(
        "project.other.railway-station-platform-layout.details.name",
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
          {row?.name || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: "platforms_number",
      headerName: t(
        "project.other.railway-station-platform-layout.details.platforms_number",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.platforms_number || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: "platform_configuration",
      headerName: t(
        "project.other.railway-station-platform-layout.details.platform_configuration",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.platform_configuration || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "platform_length",
      headerName: t(
        "project.other.railway-station-platform-layout.details.platform_length",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.platform_length
            ? `${row.platform_length} ${t("common.units.meters")}`
            : "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "accessibility_features",
      headerName: t(
        "project.other.railway-station-platform-layout.details.accessibility_features",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.accessibility_features || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: "files",
      headerName: t("common.table-columns.files"),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer id={row.id} type={otherSubMenu?.fileType || ""} />
          )}
        </>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "created_at",
      headerName: t("common.table-columns.created-at"),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.created_at ? formatCreatedAt(row.created_at) : "N/A"}
        </Typography>
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
            model="RailwayStationPlatformLayout"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformlayout",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformlayout",
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