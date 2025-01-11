import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ProjectOutcome } from 'src/types/project/project-additional-info-and-outcome';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectOutcome;
}

export const projectOutcomeColumns = (
  onDetail: (outcome: ProjectOutcome) => void,
  onEdit: (outcome: ProjectOutcome) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
    headerName: t('common.id'),
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
        {row.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'construction_type',
    headerName: t('project.outcome.construction-type'),
    renderCell: ({ row }: CellType) => row.construction_type || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'function',
    headerName: t('project.outcome.function'),
    renderCell: ({ row }: CellType) => row.function || t('common.not-available')
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'lesson_learned',
    headerName: t('project.outcome.lesson-learned'),
    renderCell: ({ row }: CellType) => row.lesson_learned || t('common.not-available')
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
          model="ProjectOutcome"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'projectoutcome'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectoutcome'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
]; 