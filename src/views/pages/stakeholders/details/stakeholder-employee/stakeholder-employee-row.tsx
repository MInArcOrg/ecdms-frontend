import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { StakeholderEmployee } from 'src/types/stakeholder/stakeholder-employee';
import type { StakeholderDepartment } from 'src/types/stakeholder/stakeholder-department';
import type { StakeholderPosition } from 'src/types/stakeholder/stakeholder-positions';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StakeholderEmployee;
}

export const employeeColumns = (
  onDetail: (employee: StakeholderEmployee) => void,
  onEdit: (employee: StakeholderEmployee) => void,
  onDelete: (id: string) => void,
  t: any,
  departments: StakeholderDepartment[],
  positions: StakeholderPosition[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('stakeholder.employee.name'),
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
        {`${row.first_name} ${row.last_name}`}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'stakeholder_department_id',
    headerName: t('stakeholder.employee.department'),
    renderCell: ({ row }: CellType) => {
      const department = departments.find((dept) => dept.id === row.stakeholder_department_id);
      return department ? department.name : t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'stakeholder_position_id',
    headerName: t('stakeholder.employee.position'),
    renderCell: ({ row }: CellType) => {
      const position = positions.find((pos) => pos.id === row.stakeholder_position_id);
      return position ? position.name : t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'email',
    headerName: t('stakeholder.employee.email'),
    renderCell: ({ row }: CellType) => row.email || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'phone',
    headerName: t('stakeholder.employee.phone'),
    renderCell: ({ row }: CellType) => row.phone || t('common.not-available')
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
          model="StakeholderEmployee"
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
            subject: 'stakeholderemployee'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'stakeholderemployee'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
