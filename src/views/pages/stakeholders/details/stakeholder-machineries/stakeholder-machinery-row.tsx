import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderMachinery } from 'src/types/stakeholder/stakeholder-machinery';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderMachinery;
}

export const machineryColumns = (
  onDetail: (machinery: StakeholderMachinery) => void,
  onEdit: (machinery: StakeholderMachinery) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('stakeholder.machinery.name'),
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
        {row.name}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'plate_no',
    headerName: t('stakeholder.machinery.plate-no'),
    renderCell: ({ row }: CellType) => row.plate_no
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'brand_name',
    headerName: t('stakeholder.machinery.brand-name'),
    renderCell: ({ row }: CellType) => row.brand_name || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'model',
    headerName: t('stakeholder.machinery.model'),
    renderCell: ({ row }: CellType) => row.model
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'year',
    headerName: t('stakeholder.machinery.year'),
    renderCell: ({ row }: CellType) => row.year || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'engine_number',
    headerName: t('stakeholder.machinery.engine-number'),
    renderCell: ({ row }: CellType) => row.engine_number
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
          model="StakeholderMachinery"
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
            subject: 'stakeholdermachinery'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholdermachinery'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
