import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { SpillwayInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SpillwayInfo;
}

export const spillwayInfoColumns = (
  onDetail: (spillwayInfo: SpillwayInfo) => void,
  onEdit: (spillwayInfo: SpillwayInfo) => void,
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
    headerName: t('project.other.spillway-info.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.name || t('common.not-available')}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.spillway-info.details.type'),
    field: 'type',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.type || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.spillway-info.details.quantity'),
    field: 'quantity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.quantity !== undefined ? row.quantity.toString() : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 200,
    headerName: t('project.other.spillway-info.details.specifications'),
    field: 'specifications',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.specifications || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.spillway-info.details.capacity'),
    field: 'capacity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.capacity !== undefined ? row.capacity.toString() : t('common.not-available')}
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
        <ModelAction model="SpillwayInfo" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
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
