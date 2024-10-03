import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ReservoirInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ReservoirInfo;
}

export const reservoirInfoColumns = (
  onDetail: (reservoirInfo: ReservoirInfo) => void,
  onEdit: (reservoirInfo: ReservoirInfo) => void,
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
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.reservoir-info.details.dam-volume'),
    field: 'dam_volume',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.dam_volume || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: t('project.other.reservoir-info.details.total-capacity'),
    field: 'total_capacity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.total_capacity || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: t('project.other.reservoir-info.details.active-capacity'),
    field: 'active_capacity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.active_capacity || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    headerName: t('project.other.reservoir-info.details.inactive-capacity'),
    field: 'inactive_capacity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.inactive_capacity || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.reservoir-info.details.catchment-area'),
    field: 'catchment_area',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.catchment_area !== undefined ? row.catchment_area.toString() : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.reservoir-info.details.surface-area'),
    field: 'surface_area',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.surface_area !== undefined ? row.surface_area.toString() : t('common.not-available')}
      </Typography>
    )
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
        <ModelAction model="ReservoirInfo" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'reservoirinfo' // Adjusted subject to match model
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'reservoirinfo' // Adjusted subject to match model
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
