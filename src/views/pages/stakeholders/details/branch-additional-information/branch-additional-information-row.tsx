import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BranchAdditionalInformation } from 'src/types/stakeholder/branch-additional-information';
import type { StakeholderBranch } from 'src/types/stakeholder/stakeholder-branch';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BranchAdditionalInformation;
}

export const additionalInformationColumns = (
  onDetail: (additionalInfo: BranchAdditionalInformation) => void,
  onEdit: (additionalInfo: BranchAdditionalInformation) => void,
  onDelete: (id: string) => void,
  t: any,
  stakeholderBranches: StakeholderBranch[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'stakeholder_branch_id',
    headerName: t('stakeholder.branch-additional-information.branch'),
    renderCell: ({ row }: CellType) => {
      const branch = stakeholderBranches.find((b) => b.id === row.stakeholder_branch_id);
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
          {branch ? branch.name : t('common.not-available')}
        </Typography>
      );
    }
  },
  {
    flex: 0.4,
    minWidth: 300,
    field: 'additional_information',
    headerName: t('stakeholder.branch-additional-information.additionalInformation'),
    renderCell: ({ row }: CellType) => row.additional_information
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'reference',
    headerName: t('stakeholder.branch-additional-information.reference'),
    renderCell: ({ row }: CellType) => row.reference || t('common.not-available')
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
          model="BranchAdditionalInformation"
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
            subject: 'branchadditionalinformation'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'branchadditionalinformation'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
