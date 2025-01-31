import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalWorkExperience } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalWorkExperience;
}

export const experienceColumns = (
  onDetail: (experience: ProfessionalWorkExperience) => void,
  onEdit: (experience: ProfessionalWorkExperience) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.25,
    minWidth: 250,
    field: 'company_name',
    headerName: t('professional.work-experience.company-name'),
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
        {row.company_name}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'position',
    headerName: t('professional.work-experience.position'),
    renderCell: ({ row }: CellType) => row.position || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 160,
    field: 'department',
    headerName: t('professional.work-experience.department'),
    renderCell: ({ row }: CellType) => row.department || t('common.not-available')
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'task_description',
    headerName: t('professional.work-experience.task-description'),
    renderCell: ({ row }: CellType) => row.task_description.substring(0, 50) + '...' || t('common.not-available')
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
          model="ProfessionalWorkExperience"
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
            subject: 'professionalworkexperience'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'professionalworkexperience'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];