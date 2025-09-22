'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { RailwayTrackData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayTrackData;
}

export const railwayTrackDataColumns = (
  onDetail: (data: RailwayTrackData) => void,
  onEdit: (data: RailwayTrackData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'railway_track_infrastructure_type_id',
    headerName: t('project.other.railway-track-data.details.railway-track-infrastructure-type-id'),
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
        {row?.railway_track_infrastructure_type_id || row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'track_type_id',
    headerName: t('project.other.railway-track-data.details.track-type-id'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.track_type_id !== undefined ? row.track_type_id : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'track_gauge_id',
    headerName: t('project.other.railway-track-data.details.track-gauge-id'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.track_gauge_id !== undefined ? row.track_gauge_id : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'track_length',
    headerName: t('project.other.railway-track-data.details.track-length'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.track_length !== undefined ? row.track_length : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'rail_type_and_size',
    headerName: t('project.other.railway-track-data.details.rail-type-and-size'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.rail_type_and_size !== undefined ? row.rail_type_and_size : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'sleepers_type_and_spacing',
    headerName: t('project.other.railway-track-data.details.sleepers-type-and-spacing'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.sleepers_type_and_spacing !== undefined ? row.sleepers_type_and_spacing : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'fastening_systems',
    headerName: t('project.other.railway-track-data.details.fastening-systems'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.fastening_systems !== undefined ? row.fastening_systems : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'ballast_type_and_depth',
    headerName: t('project.other.railway-track-data.details.ballast-type-and-depth'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.ballast_type_and_depth !== undefined ? row.ballast_type_and_depth : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'track_connection_method',
    headerName: t('project.other.railway-track-data.details.track-connection-method'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.track_connection_method !== undefined ? row.track_connection_method : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
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
        <ModelAction
          model="RailwayTracksGeometryData"
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
            subject: 'railwaytracksgeometrydata'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaytracksgeometrydata'
          }}
        />
      </Fragment>
    )
  }
];
