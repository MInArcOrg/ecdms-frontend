import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { StudyPeriodCost } from 'src/types/stakeholder/other';
import { formatCurrency } from 'src/utils/formatter/currency';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StudyPeriodCost;
}

export const studyPeriodCostColumns = (
  onDetail: (studyPeriodCost: StudyPeriodCost) => void,
  onEdit: (studyPeriodCost: StudyPeriodCost) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 120,
    field: 'id',
    headerName: 'ID',
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
    headerName: t('stakeholder.other.study-period-cost.details.study-field'),
    field: 'studyfield',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.stakeholderstudyfield?.studyfield?.title || t('common.not-available')}</Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-period-cost.details.total-month'),
    field: 'total_month',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.total_month || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-period-cost.details.study-cost'),
    field: 'study_cost',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row.study_cost) || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
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
        <ModelAction model="StudyPeriodCost" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions onEdit={() => onEdit(row)} onDelete={() => onDelete(row.id)} item={row} options={[]} />
      </Fragment>
    )
  }
];
