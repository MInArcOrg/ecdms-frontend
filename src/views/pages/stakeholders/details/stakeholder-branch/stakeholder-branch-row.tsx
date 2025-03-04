import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import type { BusinessFields } from 'src/types/general/general-master';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderBranch;
}

export const branchColumns = (
  onDetail: (branch: StakeholderBranch) => void,
  onEdit: (branch: StakeholderBranch) => void,
  onDelete: (id: string) => void,
  t: any,
  businessFields: BusinessFields[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('stakeholder.stakeholder-branch.name'),
    renderCell: ({ row }: CellType) => {
      return (
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
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'tin_number',
    headerName: t('stakeholder.stakeholder-branch.tinNumber'),
    renderCell: ({ row }: CellType) => row.tin_number || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'business_field_id',
    headerName: t('stakeholder.stakeholder-branch.businessFieldId'),
    renderCell: ({ row }: CellType) => {
      const businessField = businessFields.find((field) => field.id === row.business_field_id);
      return businessField ? businessField.title : t('common.not-available');
    }
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'description',
    headerName: t('stakeholder.stakeholder-branch.description'),
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
          model="StakeholderBranch"
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
            subject: 'stakeholderbranch'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderbranch'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
