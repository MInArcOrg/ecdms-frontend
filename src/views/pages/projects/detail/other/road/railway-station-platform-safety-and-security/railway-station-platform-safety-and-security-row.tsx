import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayStationPlatformSafetyAndSecurity } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface CellType {
  row: RailwayStationPlatformSafetyAndSecurity;
}

export const railwayStationPlatformSafetyAndSecurityColumns = (
  onDetail: (row: RailwayStationPlatformSafetyAndSecurity) => void,
  onEdit: (row: RailwayStationPlatformSafetyAndSecurity) => void,
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
      field: "railway_station_platform_layout_id",
      headerName: t(
        "project.other.railway-station-platform-safety-and-security.details.railway_station_platform_layout_id",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.railwayStationPlatformLayout ? row?.railwayStationPlatformLayout.name || row.railway_station_platform_layout_id : row.railway_station_platform_layout_id || 'N/A'}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: "platform_safety_and_security",
      headerName: t(
        "project.other.railway-station-platform-safety-and-security.details.platform_safety_and_security",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.platform_safety_and_security || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "surveillance_systems",
      headerName: t(
        "project.other.railway-station-platform-safety-and-security.details.surveillance_systems",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.surveillance_systems || "N/A"}
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
            <FileDrawer
              id={row.id}
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_SAFETY_AND_SECURITY"}
            />
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
            model="RailwayStationPlatformSafetyAndSecurity"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformsafetyandsecurity",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformsafetyandsecurity",
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