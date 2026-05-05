'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { CulvertConditionAssessment } from 'src/types/project/other';
import { formatCreatedAt, formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: CulvertConditionAssessment;
}

export const culvertConditionAssessmentColumns = (
  onDetail: (culvertConditionAssessment: CulvertConditionAssessment) => void,
  onEdit: (culvertConditionAssessment: CulvertConditionAssessment) => void,
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
        {t('common.table-columns.details')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.culvert-condition-assessment.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name || t('common.not-available')}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.culvert-condition-assessment.details.culvert-basic-data-id'),
    field: 'culvert_basic_data_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.culvertBasicData?.name || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.culvert-condition-assessment.details.structure-type-id'),
    field: 'structure_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.structureType?.title || row?.structure_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.culvert-condition-assessment.details.assessment-date'),
    field: 'assessment_date',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.assessment_date ? formatDynamicDate(row.assessment_date) : t('common.not-available')}</Typography>
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
          model="CulvertConditionAssessment"
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
            subject: 'culvertconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertconditionassessment'
          }}
        />
      </Fragment>
    )
  }
];

