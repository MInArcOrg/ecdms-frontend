import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderBranchManager } from 'src/types/stakeholder/stakeholder-branch-manager';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderBranchManager;
}

export const branchManagerColumns = (
  onDetail: (branchManager: StakeholderBranchManager) => void,
  onEdit: (branchManager: StakeholderBranchManager) => void,
  onDelete: (id: string) => void,
  t: any,
  stakeholderBranches: StakeholderBranch[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('stakeholderBranchManager.name'),
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
          {`${row.first_name} ${row.last_name}`}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'position',
    headerName: t('stakeholderBranchManager.position'),
    renderCell: ({ row }: CellType) => row.position
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'department',
    headerName: t('stakeholderBranchManager.department'),
    renderCell: ({ row }: CellType) => row.department
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'branch',
    headerName: t('stakeholderBranchManager.branch'),
    renderCell: ({ row }: CellType) => {
      const branch = stakeholderBranches.find((b) => b.id === row.stakeholder_branch_id);
      return branch ? branch.name : t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'phone',
    headerName: t('stakeholderBranchManager.phone'),
    renderCell: ({ row }: CellType) => row.phone
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
          model="StakeholderBranchManager"
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
            subject: 'stakeholderbranchmanager'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderbranchmanager'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
