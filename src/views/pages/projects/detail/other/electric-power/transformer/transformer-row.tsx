import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { Transformer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Transformer;
}

export const transformerColumns = (
  onDetail: (transformer: Transformer) => void,
  onEdit: (transformer: Transformer) => void,
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
    headerName: t('project.other.transformer-type.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => (row.transformertype_id ? row.transformertype?.name : t('common.not-available'))
  },

  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.transformer.specifications'),
    field: 'specifications',
    renderCell: ({ row }: CellType) => (row.specifications ? row.specifications : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.transformer.input-voltage'),
    field: 'input_voltage',
    renderCell: ({ row }: CellType) => (row.input_voltage ? row.input_voltage : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.transformer.output-voltage'),
    field: 'output_voltage',
    renderCell: ({ row }: CellType) => (row.output_voltage ? row.output_voltage : t('common.not-available'))
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
        <ModelAction model="Transformer" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'transformer'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'transformer'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
