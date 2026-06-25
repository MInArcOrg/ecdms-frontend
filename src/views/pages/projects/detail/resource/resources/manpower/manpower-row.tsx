import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { Professional } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Professional;
}

export const manpowerColumns = (
  onDetail: (manpower: Professional) => void,
  onEdit: (manpower: Professional) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 200,
      field: 'full_name',
      headerName: t('resources.professional.name'),
      valueGetter: ({ row }) => row.full_name || `${row.first_name || ''} ${row.middle_name || ''} ${row.last_name || ''}`.trim(),
      renderCell: ({ row }: CellType) => (
        <Typography
          component={Button}
          onClick={() => onDetail(row)}
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
            justifyContent: 'flex-start',
            p: 0,
            textAlign: 'left',
            textDecoration: 'none',
            textTransform: 'none',
            '&:hover': { color: 'primary.main', backgroundColor: 'transparent' }
          }}
        >
          {row.full_name || `${row.first_name || ''} ${row.middle_name || ''} ${row.last_name || ''}`.trim()}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'national_id_no',
      headerName: t('resources.professional.nationalIdNo'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.national_id_no || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'phone_no',
      headerName: t('resources.professional.phoneNo'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.phone_no || t('common.not-available')}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 110,
      field: 'gender',
      headerName: t('resources.professional.gender'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.gender || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'created_at',
      headerName: t('common.created-at'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction model="Professional" model_id={row?.id || ''} refetchModel={refetch} resubmit={() => refetch()} title="" postAction={() => refetch()} />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row?.id || '')}
            item={row}
            deletePermissionRule={{ action: 'delete', subject: 'projectmanpower' }}
            editPermissionRule={{ action: 'update', subject: 'projectmanpower' }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
