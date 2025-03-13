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
  refetch: () => void,
  crossSectionTypeMap: Map<string, string>
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t('project.other.segment-geometry.details.name'),
      field: 'name',
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
          {row?.name}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.cross-section-type-id'),
      field: 'cross_section_type_id',
      renderCell: ({ row }: CellType) => {
        const name = crossSectionTypeMap.get(row.cross_section_type_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.carriage-way-width'),
      field: 'carriage_way_width',
      renderCell: ({ row }: CellType) => (row.carriage_way_width !== undefined ? `${row.carriage_way_width} m` : t('common.not-available'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.lane-width'),
      field: 'lane_width',
      renderCell: ({ row }: CellType) => (row.lane_width !== undefined ? `${row.lane_width} m` : t('common.not-available'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.shoulder-width'),
      field: 'shoulder_width',
      renderCell: ({ row }: CellType) => (row.shoulder_width !== undefined ? `${row.shoulder_width} m` : t('common.not-available'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.property-access-control'),
      field: 'property_access_control',
      renderCell: ({ row }: CellType) => (row.property_access_control ? t('common.yes') : t('common.no'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.segment-geometry.details.similar-for-all-lane'),
      field: 'similar_for_all_lane',
      renderCell: ({ row }: CellType) => (row.similar_for_all_lane ? t('common.yes') : t('common.no'))
    },
    {
      flex: 0.15,
      minWidth: 150,
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
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'segmentgeometry'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'segmentgeometry'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
};
