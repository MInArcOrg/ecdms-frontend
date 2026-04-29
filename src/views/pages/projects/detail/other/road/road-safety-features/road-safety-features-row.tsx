'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ProjectRoadSafetyFeature } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectRoadSafetyFeature;
}

export const roadSafetyFeaturesColumns = (
  onDetail: (roadSafetyFeature: ProjectRoadSafetyFeature) => void,
  onEdit: (roadSafetyFeature: ProjectRoadSafetyFeature) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.18,
    minWidth: 160,
    field: 'road_safety_feature_id',
    headerName: t('project.other.road-safety-features.details.road-safety-feature'),
    renderCell: ({ row }: CellType) => {
      const label =
        row?.roadSafetyFeature?.title || row?.roadsafetyfeature?.title || row?.road_safety_feature_id || row?.id.slice(0, 5) + '...';

      return (
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
          {label}
        </Typography>
      );
    }
  },
  {
    flex: 0.18,
    minWidth: 160,
    field: 'road_segment_id',
    headerName: t('project.other.road-safety-features.details.road-segment'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.roadSegment?.name || row?.roadsegment?.name || row?.road_segment_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.18,
    minWidth: 160,
    field: 'safety_feature_condition',
    headerName: t('project.other.road-safety-features.details.safety-feature-condition'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.safety_feature_condition || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.18,
    minWidth: 160,
    field: 'created_at',
    headerName: t('common.table-columns.created-at'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at as any) : t('common.not-available')}</Typography>
    )
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadsafetyfeature'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'roadsafetyfeature'
          }}
        />
      </Fragment>
    )
  }
];
