import { Box, Button, Chip } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayPowerSubstationAndEquipment } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface CellType {
  row: RailwayPowerSubstationAndEquipment;
}

export const railwayPowerSubstationAndEquipmentColumns = (
  onDetail: (row: RailwayPowerSubstationAndEquipment) => void,
  onEdit: (row: RailwayPowerSubstationAndEquipment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypes: string[] = [],
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
          {t('common.table-columns.details') || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: "railway_station_platform_layout_id",
      headerName: t(
        "project.other.railway-power-substations-and-equipment.details.railway_station_platform_layout_id",
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
      field: "substation_capacity_and_equipment_specifications",
      headerName: t(
        "project.other.railway-power-substations-and-equipment.details.substation_capacity_and_equipment_specifications",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: "text.secondary" }}>
          {row?.substation_capacity_and_equipment_specifications || "N/A"}
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
        <Box display="flex" flexWrap="wrap" gap={1}>
          {fileTypes.map((fileType) => (
            <FileDrawer
              key={fileType}
              id={row.id}
              type={fileType}

            />
          ))}
        </Box>
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
            model="RailwayPowerSubstationAndEquipment"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwaypowersubstationandequipment",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwaypowersubstationandequipment",
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