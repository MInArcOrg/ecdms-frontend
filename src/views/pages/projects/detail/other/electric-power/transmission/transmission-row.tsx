'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { Transmission } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Transmission;
}

export const transmissionColumns = (
  onDetail: (transmission: Transmission) => void,
  onEdit: (transmission: Transmission) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 180,
    field: 'name',
    headerName: t('project.other.transmission.details.name'),
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
        {row?.name || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'transmission_voltage',
    headerName: t('project.other.transmission.details.transmission-voltage'),
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
        {row?.transmission_voltage !== undefined ? `${row.transmission_voltage} ${t('common.kv')}` : row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.transmission.details.distance-to-substation'),
    field: 'distance_to_substation',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.distance_to_substation !== undefined ? `${row.distance_to_substation} ${t('common.kilometers')}` : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.transmission.details.transmission-lines-number'),
    field: 'transmission_lines_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.transmission_lines_number !== undefined ? row.transmission_lines_number : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="Transmission"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'transmission'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'transmission'
          }}
        />
      </Fragment>
    )
  }
];
