import { Button } from "@mui/material";
import Typography from "@mui/material/Typography";
import type { GridColDef } from "@mui/x-data-grid";
import type { DetailSubMenuItemChild } from "src/types/layouts/detail-layout";
import type { RailwayVehicleOperationalPerformance } from "src/types/project/other";
import FileDrawer from "src/views/components/custom/files-drawer";
import ModelAction from "src/views/components/custom/model-actions";
import RowOptions from "src/views/shared/listing/row-options";
import { formatCreatedAt } from "src/utils/formatter/date";

interface CellType {
  row: RailwayVehicleOperationalPerformance;
}

export const railwayVehicleOperationalPerformanceColumns = (
  onDetail: (row: RailwayVehicleOperationalPerformance) => void,
  onEdit: (row: RailwayVehicleOperationalPerformance) => void,
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
      field: "railway_vehicle_identification_id",
      headerName: t(
        "project.other.railway-vehicle-operational-performance.details.railway_vehicle_identification_id",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.railwayVehicleIndentification ?
            row?.railwayVehicleIndentification + " - " + row?.railwayVehicleIndentification.manufacturer_supplier_name + " - " + row?.railwayVehicleIndentification.manufacture_year

            : row?.id ||
            "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "fuel_or_energy_consumption",
      headerName: t(
        "project.other.railway-vehicle-operational-performance.details.fuel_or_energy_consumption",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.fuel_or_energy_consumption || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "mileage_or_operating_hours",
      headerName: t(
        "project.other.railway-vehicle-operational-performance.details.mileage_or_operating_hours",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.mileage_or_operating_hours || "N/A"}
        </Typography>
      ),
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: "reliability_and_availability",
      headerName: t(
        "project.other.railway-vehicle-operational-performance.details.reliability_and_availability",
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: "text.secondary" }}>
          {row?.reliability_and_availability || "N/A"}
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
            model="RailwayVehicleOperationalPerformance"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: "delete",
              subject: "railwayvehicleoperationalperformance",
            }}
            editPermissionRule={{
              action: "update",
              subject: "railwayvehicleoperationalperformance",
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