import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { StakeholderService } from 'src/types/stakeholder/other';
import { formatCurrency } from 'src/utils/formatter/currency';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderService;
}

export const stakeholderServiceColumns = (
  onDetail: (stakeholderService: StakeholderService) => void,
  onEdit: (stakeholderService: StakeholderService) => void,
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
    headerName: t('stakeholder.other.stakeholder-service.details.service-type'),
    field: 'service_type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.constructionrelatedservice?.service_type || t('common.not-available')}</Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.stakeholder-service.details.measurement-unit'),
    field: 'measurement_unit',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.constructionrelatedservice?.measurement_unit || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.stakeholder-service.details.unit-price'),
    field: 'unit-price',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(row?.unit_price) || t('common.not-available')}</Typography>
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
        <ModelAction
          model="StakeholderService"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderService'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderService'
          }}
        />
      </Fragment>
    )
  }
];
