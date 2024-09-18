import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { HydroElectricDam } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: HydroElectricDam;
}

export const hydroElectricDamColumns = (
  onDetail: (hydroElectricDam: HydroElectricDam) => void,
  onEdit: (hydroElectricDam: HydroElectricDam) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
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
        {row.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.river-name'),
    field: 'river_name',
    renderCell: ({ row }: CellType) => (row.river_name ? row.river_name : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.elevation-from-sea-level'),
    field: 'elevation_from_sea_level',
    renderCell: ({ row }: CellType) => (row.elevation_from_sea_level ? `${row.elevation_from_sea_level} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.elevation-from-ngl'),
    field: 'elevation_from_ngl',
    renderCell: ({ row }: CellType) => (row.elevation_from_ngl ? `${row.elevation_from_ngl} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.dam-type'),
    field: 'dam_type',
    renderCell: ({ row }: CellType) => (row.dam_type ? row.dam_type : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.dam-volume'),
    field: 'dam_volume',
    renderCell: ({ row }: CellType) => (row.dam_volume ? `${row.dam_volume} cubic meters` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.gated-spillway-no'),
    field: 'gated_spillway_no',
    renderCell: ({ row }: CellType) => (row.gated_spillway_no !== undefined ? row.gated_spillway_no : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.hydro-electric-dam.details.none-gated-spillway-no'),
    field: 'none_gated_spillway_no',
    renderCell: ({ row }: CellType) => (row.none_gated_spillway_no !== undefined ? row.none_gated_spillway_no : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}
      </Typography>
    )
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction model="HydroElectricDam" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'hydroelectricdam'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'hydroelectricdam'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
