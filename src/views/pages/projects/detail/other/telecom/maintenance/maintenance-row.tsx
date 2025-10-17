'use client';

import { Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { Maintenance } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Maintenance;
}

export const maintenanceColumns = (
  onDetail: (maintenance: Maintenance) => void,
  onEdit: (maintenance: Maintenance) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
    headerName: t('common.table-columns.id'),
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
        {row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.maintenance.details.maintenance-frequency'),
    field: 'maintenance_frequency',
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.maintenance_frequency ? t('common.yes') : t('common.no')}
        color={row?.maintenance_frequency ? 'success' : 'default'}
      />
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.maintenance.details.service-level-agreement'),
    field: 'service_level_agreement',
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.service_level_agreement ? t('common.yes') : t('common.no')}
        color={row?.service_level_agreement ? 'success' : 'default'}
      />
    )
  },
  {
    flex: 0.25,
    minWidth: 150,
    headerName: t('project.other.maintenance.details.remark'),
    field: 'remark',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.remark ? (row.remark.length > 30 ? row.remark.substring(0, 30) + '...' : row.remark) : t('common.not-available')}
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
          model="Maintenance"
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
            subject: 'maintenance'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'maintenance'
          }}
        />
      </Fragment>
    )
  }
];
