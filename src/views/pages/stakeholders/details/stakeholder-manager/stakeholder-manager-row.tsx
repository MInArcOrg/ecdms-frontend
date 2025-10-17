import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderManager } from 'src/types/stakeholder/stakeholder-manager';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderManager;
}

export const managerColumns = (
  onDetail: (manager: StakeholderManager) => void,
  onEdit: (manager: StakeholderManager) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('stakeholder.stakeholder-manager.firstName'),
    renderCell: ({ row }: CellType) => {
      const fullName = `${row.first_name} ${row.middle_name ? row.middle_name + ' ' : ''}${row.last_name}`;
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
          {fullName}
        </Typography>
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'department',
    headerName: t('stakeholder.stakeholder-manager.department'),
    renderCell: ({ row }: CellType) => row.department
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'position',
    headerName: t('stakeholder.stakeholder-manager.position'),
    renderCell: ({ row }: CellType) => row.position || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'email',
    headerName: t('stakeholder.stakeholder-manager.email'),
    renderCell: ({ row }: CellType) => row.email
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'phone_no',
    headerName: t('stakeholder.stakeholder-manager.phoneNo'),
    renderCell: ({ row }: CellType) => row.phone_no
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
          model="StakeholderManager"
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
            subject: 'stakeholdermanager'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholdermanager'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
