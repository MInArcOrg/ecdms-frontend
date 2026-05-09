import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { UserEducation } from 'src/types/admin/user';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: UserEducation;
}

export const educationColumns = (onEdit: (education: UserEducation) => void, onDelete: (id: string) => void, t: any): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 240,
    field: 'study_field',
    headerName: t('department.user.education.study-field'),
    renderCell: ({ row }: CellType) => {
      return row.studyField?.title || row.study_field_id || t('common.not-available');
    }
  },
  {
    flex: 0.2,
    minWidth: 140,
    field: 'school_name',
    headerName: t('department.user.education.school-name'),
    renderCell: ({ row }: CellType) => row.school_name || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 160,
    field: 'education_level',
    headerName: t('department.user.education.education-level'),
    renderCell: ({ row }: CellType) => row.education_level || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'program_type',
    headerName: t('department.user.education.program-type'),
    renderCell: ({ row }: CellType) => row.program_type || t('common.not-available')
  },
  {
    flex: 0.1,
    minWidth: 80,
    field: 'gpa',
    headerName: t('department.user.education.gpa'),
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
          model="UserEducation"
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
            subject: 'usereducation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'usereducation'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
