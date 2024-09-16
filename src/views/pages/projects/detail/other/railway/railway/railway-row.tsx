import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { Railway } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Railway;
}

export const railwayColumns = (
  onDetail: (railway: Railway) => void,
  onEdit: (railway: Railway) => void,
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
    minWidth: 150,
    headerName: t('project.other.railway.details.major-operator'),
    field: 'major_operator',
    renderCell: ({ row }: CellType) => (row.major_operator ? row.major_operator : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.railway.details.energy-source'),
    field: 'energy_source',
    renderCell: ({ row }: CellType) => (row.energy_source ? row.energy_source : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.railway.details.system-length'),
    field: 'system_length',
    renderCell: ({ row }: CellType) => (row.system_length ? row.system_length.toString() : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.railway.details.total-stations'),
    field: 'total_station_no',
    renderCell: ({ row }: CellType) => (row.total_station_no ? row.total_station_no.toString() : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.railway.details.freight-cargo-no'),
    field: 'fright_cargo_no',
    renderCell: ({ row }: CellType) => (row.fright_cargo_no ? row.fright_cargo_no.toString() : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.railway.details.transport-cargo-no'),
    field: 'transport_cargo_no',
    renderCell: ({ row }: CellType) => (row.transport_cargo_no ? row.transport_cargo_no.toString() : t('common.not-available'))
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
        <ModelAction model="Railway" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'railway'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'railway'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
