'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { SegmentGeometry } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SegmentGeometry;
}

export const segmentGeometryColumns = (
  onDetail: (segmentGeometry: SegmentGeometry) => void,
  onEdit: (segmentGeometry: SegmentGeometry) => void,
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
          t('common.table-columns.details')
        </Typography>
      )
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.name'),
      field: 'name',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.cross-section-type-id'),
      field: 'cross_section_type_id',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.cross_section_type_id || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.carriage-way-width'),
      field: 'carriage_way_width',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.carriage_way_width || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.lane-width'),
      field: 'lane_width',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.lane_width || t('common.not-available')}</Typography>
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
            model="SegmentGeometry"
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
              subject: 'segmentgeometry'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'segmentgeometry'
            }}
          />
        </Fragment>
      )
    }
  ];
