import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ProfessionalContact } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalContact;
}

export const contactColumns = (
  onDetail: (contact: ProfessionalContact) => void,
  onEdit: (contact: ProfessionalContact) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'email',
      headerName: t('professional.contact.email'),
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
          {row.email || t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'phone_no',
      headerName: t('professional.contact.phone'),
      renderCell: ({ row }: CellType) => row.phone_no || t('common.not-available')
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'website',
      headerName: t('professional.contact.website'),
      renderCell: ({ row }: CellType) => row.website || t('common.not-available')
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
            model="ProfessionalContact"
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
              subject: 'professionalcontact'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'professionalcontact'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
