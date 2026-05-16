import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleMaintenanceAndInspection } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayVehicleMaintenanceAndInspection;
}

export const railwayVehicleMaintenanceAndInspectionColumns = (
  onDetail: (row: RailwayVehicleMaintenanceAndInspection) => void,
  onEdit: (row: RailwayVehicleMaintenanceAndInspection) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
    {
      flex: 0.1,
      minWidth: 80,
      field: 'id',
      headerName: t('common.table-columns.id'),
      renderCell: ({ row }: CellType) => (
        <Typography
          noWrap
          component={Button}
          onClick={() => onDetail(row)}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {row?.id?.toString().slice(0, 5) || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'railway_vehicle_identification_id',
      headerName: t('project.other.railway-vehicle-maintenance-and-inspection.details.railway_vehicle_identification_id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railwayVehicleIndentification
            ? row?.railwayVehicleIndentification +
            ' - ' +
            row?.railwayVehicleIndentification.manufacturer_supplier_name +
            ' - ' +
            row?.railwayVehicleIndentification.manufacture_year
            : row?.railway_vehicle_identification_id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'maintenance_history_records',
      headerName: t('project.other.railway-vehicle-maintenance-and-inspection.details.maintenance_history_records'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.maintenance_history_records?.substring(0, 30) || 'N/A'}...</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'vehicle_weight_and_load_capacity',
      headerName: t('project.other.railway-vehicle-maintenance-and-inspection.details.vehicle_weight_and_load_capacity'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.vehicle_weight_and_load_capacity || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'brakingSystemType.title',
      headerName: t('project.other.railway-vehicle-maintenance-and-inspection.details.braking_system_type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.brakingSystemType?.title || 'N/A'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'maximum_speed',
      headerName: t('project.other.railway-vehicle-maintenance-and-inspection.details.maximum_speed'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.maximum_speed ? `${row.maximum_speed} km/h` : 'N/A'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || ''} />}</>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}</Typography>
      )
    },
    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <ModelAction
            model="RailwayVehicleMaintenanceAndInspection"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayvehiclemaintenanceandinspection'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayvehiclemaintenanceandinspection'
            }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id as string)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
