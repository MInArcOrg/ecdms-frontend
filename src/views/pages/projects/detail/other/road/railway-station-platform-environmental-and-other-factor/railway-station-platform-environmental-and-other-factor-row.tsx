import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayStationPlatformEnvironmentalAndOtherFactor } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface CellType {
  row: RailwayStationPlatformEnvironmentalAndOtherFactor;
}

export const railwayStationPlatformEnvironmentalAndOtherFactorColumns = (
  onDetail: (row: RailwayStationPlatformEnvironmentalAndOtherFactor) => void,
  onEdit: (row: RailwayStationPlatformEnvironmentalAndOtherFactor) => void,
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
        "project.other.railway-station-platform-environmental-and-other-factor.details.railway_station_platform_layout_id",
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
      field: "environmental_compliance_measures",
      headerName: t(
        "project.other.railway-station-platform-environmental-and-other-factor.details.environmental_compliance_measures",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.environmental_compliance_measures || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "noise_and_vibration_control_measures",
      headerName: t(
        "project.other.railway-station-platform-environmental-and-other-factor.details.noise_and_vibration_control_measures",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.noise_and_vibration_control_measures || "N/A"}
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
              type={otherSubMenu?.fileType || "RAILWAY_STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTOR"}
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
            model="RailwayStationPlatformEnvironmentalAndOtherFactor"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaystationplatformenvironmentalandotherfactor",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaystationplatformenvironmentalandotherfactor",
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