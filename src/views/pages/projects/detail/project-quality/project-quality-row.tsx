import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectQuality } from 'src/types/project/project-quality';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectQuality;
}

export const qualityColumns = (
  onDetail: (quality: ProjectQuality) => void,
  onEdit: (quality: ProjectQuality) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'major_quality_problem_encountered',
    headerName: t('project.quality.major-quality-problem-encountered'),
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
        {row.major_quality_problem_encountered}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'description',
    headerName: t('project.quality.description'),
    renderCell: ({ row }: CellType) => row.description
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'measures_taken',
    headerName: t('project.quality.measures-taken'),
    renderCell: ({ row }: CellType) => row.measures_taken
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'lesson_learned',
    headerName: t('project.quality.lesson-learned'),
    renderCell: ({ row }: CellType) => row.lesson_learned
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
          model="ProjectQuality"
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
            subject: 'projectquality'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'projectquality'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
