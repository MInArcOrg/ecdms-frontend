import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectManager } from 'src/types/project/project-manager';
import type { Stakeholder } from 'src/types/stakeholder';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectManager;
}

export const managerColumns = (
  onDetail: (manager: ProjectManager) => void,
  onEdit: (manager: ProjectManager) => void,
  onDelete: (id: string) => void,
  t: any,
  stakeholders: Stakeholder[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('project.other.project-manager.firstName'),
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
    flex: 0.2,
    minWidth: 200,
    field: 'stakeholder',
    headerName: t('project.other.project-manager.stakeholder'),
    renderCell: ({ row }: CellType) => {
      const stakeholder = stakeholders.find((s) => s.id === row.stakeholder_id);
      return stakeholder ? stakeholder.trade_name : t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'position',
    headerName: t('project.other.project-manager.position'),
    renderCell: ({ row }: CellType) => row.position || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'email',
    headerName: t('project.other.project-manager.email'),
    renderCell: ({ row }: CellType) => row.email
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'phone',
    headerName: t('project.other.project-manager.phone'),
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
          model="ProjectManager"
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
            subject: 'projectmanager'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'projectmanager'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
