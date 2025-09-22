'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { RailwayTrackConditionAssessment } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface AssessmentCellType {
  row: RailwayTrackConditionAssessment;
}

export const railwayTrackConditionAssessmentColumns = (
  onDetail: (data: RailwayTrackConditionAssessment) => void,
  onEdit: (data: RailwayTrackConditionAssessment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'project_id',
      headerName: t('project.other.railway-track-condition-assessment.details.project-id'),
      renderCell: ({ row }: AssessmentCellType) => (
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
          {row?.project_id || row?.id?.slice(0, 8) + '...'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'inspection_dates',
      headerName: t('project.other.railway-track-condition-assessment.details.inspection-dates'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.inspection_dates ? formatDynamicDate(row.inspection_dates) : t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'track_condition_rating_id',
      headerName: t('project.other.railway-track-condition-assessment.details.track-condition-rating-id'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.track_condition_rating_id !== undefined ? row.track_condition_rating_id : t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'observed_defects_id',
      headerName: t('project.other.railway-track-condition-assessment.details.observed-defects-id'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.observed_defects_id !== undefined ? row.observed_defects_id : t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'track_settlement_irregularities',
      headerName: t('project.other.railway-track-condition-assessment.details.track-settlement-irregularities'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.track_settlement_irregularities !== undefined ? row.track_settlement_irregularities : t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'remark',
      headerName: t('project.other.railway-track-condition-assessment.details.remark'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.remark !== undefined ? row.remark : t('common.not-available')}</Typography>
      )
    },
    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: AssessmentCellType) => (
        <Fragment>
          <ModelAction
            model="RailwayTrackConditionAssessment"
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
              subject: 'railwaytrackconditionassessment'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaytrackconditionassessment'
            }}
          />
        </Fragment>
      )
    }
  ];
