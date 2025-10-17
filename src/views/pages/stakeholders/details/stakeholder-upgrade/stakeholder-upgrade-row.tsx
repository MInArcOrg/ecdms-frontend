import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderUpgrade } from 'src/types/stakeholder/stakeholder-upgrade';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderUpgrade;
}

export const upgradeColumns = (
  onDetail: (upgrade: StakeholderUpgrade) => void,
  onEdit: (upgrade: StakeholderUpgrade) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'stakeholder_id',
    headerName: t('stakeholder.stakeholder-upgrade.form.stakeholder-id'),
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
        {row.stakeholder_id}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'upgrade_type',
    headerName: t('stakeholder.stakeholder-upgrade.form.upgrade-type'),
    renderCell: ({ row }: CellType) => row.upgrade_type || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'previous_level',
    headerName: t('stakeholder.stakeholder-upgrade.form.previous-level'),
    renderCell: ({ row }: CellType) => row.previous_level || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'upgraded_level',
    headerName: t('stakeholder.stakeholder-upgrade.form.upgraded-level'),
    renderCell: ({ row }: CellType) => row.upgraded_level || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'ownership_percentage',
    headerName: t('stakeholder.stakeholder-upgrade.form.ownership-percentage'),
    renderCell: ({ row }: CellType) => (row.ownership_percentage != null ? row.ownership_percentage + '%' : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'description',
    headerName: t('stakeholder.stakeholder-upgrade.form.description'),
    renderCell: ({ row }: CellType) => row.description || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'created_at',
    headerName: t('common.created-at'),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="StakeholderUpgrade"
          model_id={row?.id || ''}
          refetchModel={() => {}}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || '')}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'stakeholderupgrade'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderupgrade'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
