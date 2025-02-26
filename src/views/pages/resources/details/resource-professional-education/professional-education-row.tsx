import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProfessionalEducation } from 'src/types/resource';
import type { StudyField } from 'src/types/general/general-master';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalEducation;
}

export const educationColumns = (
  onDetail: (education: ProfessionalEducation) => void,
  onEdit: (education: ProfessionalEducation) => void,
  onDelete: (id: string) => void,
  t: any,
  studyFields?: StudyField[]
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 290,
      field: 'study_field',
      headerName: t('resources.professional.education.study-field'),
      renderCell: ({ row }: CellType) => {
        const studyField = studyFields?.find((field) => field.id === row.study_field);
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
            {studyField ? studyField.title : t('common.not-available')}
          </Typography>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 140,
      field: 'school_name',
      headerName: t('resources.professional.education.school-name'),
      renderCell: ({ row }: CellType) => row.school_name || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'education_level',
      headerName: t('resources.professional.education.education-level'),
      renderCell: ({ row }: CellType) => row.education_level || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'program_type',
      headerName: t('resources.professional.education.program-type'),
      renderCell: ({ row }: CellType) => row.program_type || t('common.not-available')
    },
    {
      flex: 0.1,
      minWidth: 80,
      field: 'gpa',
      headerName: t('resources.professional.education.gpa'),
      renderCell: ({ row }: CellType) => row.gpa || t('common.not-available')
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
            model="ProfessionalEducation"
            model_id={row?.id || ''}
            refetchModel={() => { }}
            resubmit={() => { }}
            title=""
            postAction={() => { }}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row?.id || '')}
            item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'professionaleducation'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'professionaleducation'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
