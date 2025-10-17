import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayStationPlatformFacility } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayStationPlatformFacility;
}

export const railwayStationPlatformFacilityColumns = (
  onDetail: (row: RailwayStationPlatformFacility) => void,
  onEdit: (row: RailwayStationPlatformFacility) => void,
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
    field: 'railway_station_platform_layout_id',
    headerName: t('project.other.railway-station-platform-facility.details.railway_station_platform_layout_id'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.railwayStationPlatformLayout ? row?.railwayStationPlatformLayout.name || row.railway_station_platform_layout_id : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'waiting_areas_seating_capacity',
    headerName: t('project.other.railway-station-platform-facility.details.waiting_areas_seating_capacity'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.waiting_areas_seating_capacity ? t('common.yes') : t('common.no')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'restrooms_and_amenities_availability',
    headerName: t('project.other.railway-station-platform-facility.details.restrooms_and_amenities_availability'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.restrooms_and_amenities_availability ? t('common.yes') : t('common.no')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'passenger_information_system',
    headerName: t('project.other.railway-station-platform-facility.details.passenger_information_system'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.passenger_information_system || 'N/A'}</Typography>
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
          model="RailwayStationPlatformFacility"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaystationplatformfacility'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaystationplatformfacility'
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
