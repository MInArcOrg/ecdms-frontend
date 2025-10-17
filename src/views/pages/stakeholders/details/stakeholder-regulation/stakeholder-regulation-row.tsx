import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { StakeholderRegulation } from 'src/types/stakeholder/stakeholder-regulation';
import { formatCreatedAt } from 'src/utils/formatter/date'; // Assuming you have a date formatter
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderRegulation;
}

export const stakeholderRegulationColumns = (
  onDetail: (stakeholderRegulation: StakeholderRegulation) => void,
  onEdit: (stakeholderRegulation: StakeholderRegulation) => void,
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
        {row?.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('stakeholder.stakeholder-regulation.title'),
    field: 'title',
    renderCell: ({ row }: CellType) => (row?.title ? row.title : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('stakeholder.stakeholder-regulation.regulation'),
    field: 'description', // Assuming you want to show the description instead
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.description ? row.description : t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('stakeholder.stakeholder-regulation.effective-start-date'),
    field: 'effective_start_date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.effective_start_date ? formatCreatedAt(row.effective_start_date) : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('stakeholder.stakeholder-regulation.effective-end-date'),
    field: 'effective_end_date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.effective_end_date ? formatCreatedAt(row.effective_end_date) : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="StakeholderRegulation"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {
            throw new Error('Function not implemented.');
          }}
          title=""
          postAction={() => {
            throw new Error('Function not implemented.');
          }}
        />
        <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} options={[]} />
      </Fragment>
    )
  }
];
