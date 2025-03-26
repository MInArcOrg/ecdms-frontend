'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { RoadMaintenanceActivity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RoadMaintenanceActivity;
}

export const roadMaintenanceActivityColumns = (
  onDetail: (roadMaintenanceActivity: RoadMaintenanceActivity) => void,
  onEdit: (roadMaintenanceActivity: RoadMaintenanceActivity) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  maintenanceFrequencyMap: Map<string, string>,
  maintenanceTypeMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'road_segment',
    headerName: t('project.other.road-maintenance-activity.details.road-segment'),
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
        {row?.road_segment || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.road-maintenance-activity.details.maintenance-frequency'),
    field: 'maintenance_frequency_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.maintenance_frequency_id
          ? maintenanceFrequencyMap.get(row.maintenance_frequency_id) || t('common.not-available')
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.road-maintenance-activity.details.maintenance-type'),
    field: 'maintenance_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.maintenance_type_id
          ? maintenanceTypeMap.get(row.maintenance_type_id) || t('common.not-available')
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.road-maintenance-activity.details.consultant'),
    field: 'consultant',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.consultant || t('common.not-available')}</Typography>
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
          model="RoadMaintenanceActivity"
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
            subject: 'roadmaintenanceactivity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'roadmaintenanceactivity'
          }}
        />
      </Fragment>
    )
  }
];
