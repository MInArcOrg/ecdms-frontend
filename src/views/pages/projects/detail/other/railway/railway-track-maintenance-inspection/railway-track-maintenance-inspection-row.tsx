'use client';

import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { RailwayTrackMaintenanceAndInspection } from 'src/types/project/other';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayTrackMaintenanceAndInspection;
}

export const railwayTrackMaintenanceAndInspectionColumns = (
  onDetail: (data: RailwayTrackMaintenanceAndInspection) => void,
  onEdit: (data: RailwayTrackMaintenanceAndInspection) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      field: 'project_id',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.project-id'),
      flex: 1,
      renderCell: (params: any) => params.row.id || 'N/A'
    },
    {
      field: 'scheduled_maintenance_activity_id',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.scheduled-maintenance-activity-id'),
      flex: 1,
      renderCell: (params: any) => params.row.scheduled_maintenance_activity_id || 'N/A'
    },
    {
      field: 'maintenance_method',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.maintenance-method'),
      flex: 1,
      renderCell: (params: any) => params.row.maintenance_method || 'N/A'
    },
    {
      field: 'track_maintenance_frequency_id',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.track-maintenance-frequency-id'),
      flex: 1,
      renderCell: (params: any) => params.row.track_maintenance_frequency_id || 'N/A'
    },
    {
      field: 'recent_maintenance_date',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.recent-maintenance-date'),
      flex: 1,
      renderCell: (params: any) => formatDynamicDate(params.row.recent_maintenance_date) || 'N/A'
    },
    {
      field: 'inspection_reports_and_findings',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.inspection-reports-and-findings'),
      flex: 1,
      renderCell: (params: any) => params.row.inspection_reports_and_findings || 'N/A'
    },
    {
      field: 'remark',
      headerName: t('project.other.railway-track-maintenance-and-inspection.details.remark'),
      flex: 1,
      renderCell: (params: any) => params.row.remark || 'N/A'
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
