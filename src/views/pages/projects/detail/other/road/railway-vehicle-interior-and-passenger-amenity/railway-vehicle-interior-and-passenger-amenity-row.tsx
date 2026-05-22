import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleInteriorAndPassengerAmenity } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayVehicleInteriorAndPassengerAmenity;
}

export const railwayVehicleInteriorAndPassengerAmenityColumns = (
  onDetail: (row: RailwayVehicleInteriorAndPassengerAmenity) => void,
  onEdit: (row: RailwayVehicleInteriorAndPassengerAmenity) => void,
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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'railway_vehicle_identification_id',
      headerName: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.railway_vehicle_identification_id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railwayVehicleIdentification
            ? row?.railwayVehicleIdentification +
            ' - ' +
            row?.railwayVehicleIdentification.manufacturer_supplier_name +
            ' - ' +
            row?.railwayVehicleIdentification.manufacture_year
            : row?.railway_vehicle_identification_id || 'N/A'}{' '}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'seating_capacity',
      headerName: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.seating_capacity'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.seating_capacity || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'passenger_amenities_availability',
      headerName: t('project.other.railway-vehicle-interior-and-passenger-amenity.details.passenger_amenities_availability'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.passenger_amenities_availability || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'accessibility_features_for_passengers_with_disabilities',
      headerName: t(
        'project.other.railway-vehicle-interior-and-passenger-amenity.details.accessibility_features_for_passengers_with_disabilities'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.accessibility_features_for_passengers_with_disabilities ? t('common.yes') : t('common.no')}
        </Typography>
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
            model="RailwayVehicleInteriorAndPassengerAmenity"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayvehicleinteriorandpassengeramenity'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayvehicleinteriorandpassengeramenity'
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
