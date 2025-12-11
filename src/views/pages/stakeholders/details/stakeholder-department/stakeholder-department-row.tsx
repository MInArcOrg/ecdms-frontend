import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderDepartment;
}

export const departmentColumns = (
  onDetail: (department: StakeholderDepartment) => void,
  onEdit: (department: StakeholderDepartment) => void,
  onDelete: (id: string) => void,
  t: any,
  departments: StakeholderDepartment[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('stakeholder.stakeholder-department.name'),
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
    flex: 0.2,
    minWidth: 200,
    field: 'parent_department_id',
    headerName: t('stakeholder.stakeholder-department.parentDepartment'),
    renderCell: ({ row }: CellType) => {
      const parentDepartment = departments.find((d) => d.id === row.parent_department_id);
      return parentDepartment ? parentDepartment.name : t('common.not-available');
    }
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'description',
    headerName: t('stakeholder.stakeholder-department.description'),
    renderCell: ({ row }: CellType) => row.description
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'reference',
    headerName: t('stakeholder.stakeholder-department.reference'),
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
          model="StakeholderDepartment"
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
            subject: 'stakeholderdepartment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'stakeholderdepartment'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
