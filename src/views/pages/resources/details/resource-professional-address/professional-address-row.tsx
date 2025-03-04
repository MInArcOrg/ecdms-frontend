import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ProfessionalAddress } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProfessionalAddress;
}

export const addressColumns = (
  onDetail: (address: ProfessionalAddress) => void,
  onEdit: (address: ProfessionalAddress) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'country',
    headerName: t('professional.address.country'),
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
        {row.country || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'city',
    headerName: t('professional.address.city'),
    renderCell: ({ row }: CellType) => row.city || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'sub_city',
    headerName: t('professional.address.sub_city'),
    renderCell: ({ row }: CellType) => row.sub_city || t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'street',
    headerName: t('professional.address.street'),
    renderCell: ({ row }: CellType) => row.street || t('common.not-available')
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
          model="ProfessionalAddress"
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
            subject: 'professionaladdress'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'professionaladdress'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
