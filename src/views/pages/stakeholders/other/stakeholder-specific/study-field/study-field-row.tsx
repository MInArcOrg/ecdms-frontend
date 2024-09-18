import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { StudyField } from 'src/types/stakeholder/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: StudyField;
}

export const studyFieldColumns = (
  onDetail: (studyField: StudyField) => void,
  onEdit: (studyField: StudyField) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 120,
    field: 'id',
    headerName: 'ID',
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
        {row?.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-field.details.title'),
    field: 'title',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.title || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-field.details.description'),
    field: 'description',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.description || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-field.details.study-program-id'),
    field: 'study_program_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.study_program_id || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-field.details.studylevel-id'),
    field: 'studylevel_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.studylevel_id || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('stakeholder.other.study-field.details.revision-no'),
    field: 'revision_no',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.revision_no ?? t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}
      </Typography>
    )
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="StudyField"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions onEdit={() => onEdit(row)} onDelete={() => onDelete(row.id)} item={row} options={[]} />
      </Fragment>
    )
  }
];
