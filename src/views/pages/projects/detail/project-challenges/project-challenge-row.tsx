import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectChallenge } from 'src/types/project/project-challenge';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectChallenge;
}

export const projectChallengeColumns = (
  onDetail: (projectChallenge: ProjectChallenge) => void,
  onEdit: (projectChallenge: ProjectChallenge) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'challenge_type',
    headerName: t('project.other.challenges.challenge-type'),
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
        {row.challenge_type}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'description',
    headerName: t('project.other.challenges.description'),
    renderCell: ({ row }: CellType) => row.description
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
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || '')}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectchallenge'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'projectchallenge'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
