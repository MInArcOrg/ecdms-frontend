import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { Resource } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Resource;
}

export const materialColumns = (
  onDetail: (material: Resource) => void,
  onEdit: (material: Resource) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.25,
      minWidth: 220,
      field: 'name',
      headerName: t('resource.columns.name'),
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
          {row.name || t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'remark',
      headerName: t('resource.columns.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.remark || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>

          <ModelAction model="Resource" model_id={row.id || ''} refetchModel={refetch} resubmit={() => refetch()} title="" postAction={() => refetch()} />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id || '')}
            item={row}
            deletePermissionRule={{ action: 'delete', subject: 'projectmaterial' }}
            editPermissionRule={{ action: 'update', subject: 'projectmaterial' }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
