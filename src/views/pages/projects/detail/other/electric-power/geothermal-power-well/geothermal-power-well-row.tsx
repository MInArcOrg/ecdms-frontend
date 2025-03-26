'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { GeothermalPowerWell } from 'src/types/project/other';
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: GeothermalPowerWell;
}

export const geothermalPowerWellColumns = (
  onDetail: (geothermalPowerWell: GeothermalPowerWell) => void,
  onEdit: (geothermalPowerWell: GeothermalPowerWell) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'wells_name',
    headerName: t('project.other.geothermal-power-well.details.wells-name'),
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
        {row?.wells_name || row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.geothermal-power-well.details.wells-number'),
    field: 'wells_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.wells_number !== undefined ? row.wells_number : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.geothermal-power-well.details.depth'),
    field: 'depth',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.depth !== undefined ? `${row.depth} ${t('common.meters')}` : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.geothermal-power-well.details.temperature-at-bottom-hole'),
    field: 'temperature_at_bottom_hole',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.temperature_at_bottom_hole !== undefined ? `${row.temperature_at_bottom_hole} °C` : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.geothermal-power-well.details.drilling-period'),
    field: 'drilling_period',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.drilling_period ? formatDate(row.drilling_period) : t('common.not-available')}
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
          model="GeothermalPowerWell"
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
            subject: 'geothermalpowerwell'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'geothermalpowerwell'
          }}
        />
      </Fragment>
    )
  }
];
