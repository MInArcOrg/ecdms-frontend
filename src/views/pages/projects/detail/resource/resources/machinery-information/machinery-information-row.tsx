import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { MachineryInformation } from 'src/types/resource';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: MachineryInformation;
}

export const machineryInformationColumns = (
  onEdit: (item: MachineryInformation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 180,
    field: 'plate_no',
    headerName: t('Plate No'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.plate_no || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'type',
    headerName: t('Type'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.type || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 170,
    field: 'owner_name',
    headerName: t('Owner Name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.owner_name || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 180,
    field: 'make_model',
    headerName: t('Make / Model'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{`${row.make || ''}${row.model ? ` • ${row.model}` : ''}` || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 110,
    field: 'manufacture_year',
    headerName: t('Year'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.manufacture_year?.toString() || t('common.not-available')}</Typography>
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
        <ModelAction model="MachineryInformation" model_id={row?.id || ''} refetchModel={refetch} resubmit={() => refetch()} title="" postAction={() => refetch()} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || '')}
          item={row}
          deletePermissionRule={{ action: 'delete', subject: 'resource' }}
          editPermissionRule={{ action: 'update', subject: 'resource' }}
          options={[]}
        />
      </Fragment>
    )
  }
];
