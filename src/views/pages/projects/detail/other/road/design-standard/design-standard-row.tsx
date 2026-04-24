'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { DesignStandard } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: DesignStandard;
}

export const designStandardColumns = (
  onDetail: (designStandard: DesignStandard) => void,
  onEdit: (designStandard: DesignStandard) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
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
        {row?.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.design-standard.details.road-segment'),
    field: 'road_segment_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.roadSegment?.name ?? t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    headerName: t('project.other.design-standard.details.design-standard-id'),
    field: 'design_standard_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.designStandard?.title ?? row?.design_standard_id ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 160,
    headerName: t('project.other.design-standard.details.design-life-time-years'),
    field: 'design_life_time_years',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.design_life_time_years ?? t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    headerName: t('project.other.design-standard.details.segment-number'),
    field: 'segment_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.segment_number ?? t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}</Typography>
    )
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="DesignStandard"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={(): void => {
            throw new Error('Function not implemented.');
          }}
          title=""
          postAction={(): void => {
            throw new Error('Function not implemented.');
          }}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'designstandard'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'designstandard'
          }}
        />
      </Fragment>
    )
  }
];

