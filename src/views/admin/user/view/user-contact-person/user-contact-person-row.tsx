import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { UserContactPerson } from 'src/types/admin/user';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: UserContactPerson;
}

export const userContactPersonColumns = (
  onEdit: (contactPerson: UserContactPerson) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'name',
    headerName: t('resources.user.contact-person.name'),
    renderCell: ({ row }: CellType) => {
      return (
          `${row.first_name} ${row.last_name}`
      );
    }
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'national_id_no',
    headerName: t('resources.user.contact-person.nationalIdNo'),
    renderCell: ({ row }: CellType) => row.national_id_no
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'email',
    headerName: t('resources.user.contact-person.email'),
    renderCell: ({ row }: CellType) => row.email
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'phone_no',
    headerName: t('resources.user.contact-person.phoneNo'),
    renderCell: ({ row }: CellType) => row.phone_no
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'gender',
    headerName: t('resources.user.contact-person.gender'),
    renderCell: ({ row }: CellType) => row.gender
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
          model="ContactPerson"
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
            subject: 'contactperson'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'contactperson'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
