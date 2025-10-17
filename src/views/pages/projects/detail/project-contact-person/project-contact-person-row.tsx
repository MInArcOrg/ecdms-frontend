// src/views/project/project-contact-person-row.tsx
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectContactPerson } from 'src/types/project/projext-contact-person';
import type { Stakeholder } from 'src/types/stakeholder';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectContactPerson;
}

export const contactPersonColumns = (
  onDetail: (contactPerson: ProjectContactPerson) => void,
  onEdit: (contactPerson: ProjectContactPerson) => void,
  onDelete: (id: string) => void,
  t: any,
  stakeholders: Stakeholder[]
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('project.project-contact-person.form.firstName'),
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
    headerName: t('project.project-contact-person.form.stakeholder'),
    renderCell: ({ row }: CellType) => {
      const stakeholder = stakeholders.find((s) => s.id === row.stakeholder_id);
      return stakeholder ? stakeholder.trade_name : t('common.not-available');
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'position',
    headerName: t('project.project-contact-person.form.position'),
    renderCell: ({ row }: CellType) => row.position || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'department',
    headerName: t('project.project-contact-person.form.department'),
    renderCell: ({ row }: CellType) => row.department || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'email',
    headerName: t('project.project-contact-person.form.email'),
    renderCell: ({ row }: CellType) => row.email
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'phone',
    headerName: t('project.project-contact-person.form.phone'),
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
          model="ProjectContactPerson"
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
            subject: 'projectcontactperson'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'projectcontactperson'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
