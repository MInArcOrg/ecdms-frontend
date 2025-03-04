import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectSafetyStatus } from 'src/types/project/project-safety-status ';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectSafetyStatus;
}

export const safetyStatusColumns = (
  onDetail: (safetyStatus: ProjectSafetyStatus) => void,
  onEdit: (safetyStatus: ProjectSafetyStatus) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'fatal_injuries',
    headerName: t('project.safety-status.fatal-injuries'),
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
        {row.no_of_fatal_injuries}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'major_injuries',
    headerName: t('project.safety-status.major-injuries'),
    renderCell: ({ row }: CellType) => row.no_of_major_injuries
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'minor_injuries',
    headerName: t('project.safety-status.minor-injuries'),
    renderCell: ({ row }: CellType) => row.no_of_minor_injuries
  },
  {
    flex: 0.3,
    minWidth: 250,
    field: 'measures_taken',
    headerName: t('project.safety-status.measures-taken'),
    renderCell: ({ row }: CellType) => row.measures_taken
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
          model="ProjectSafetyStatus"
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
            subject: 'projectsafetystatus'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectsafetystatus'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
