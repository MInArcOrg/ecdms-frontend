import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySleeperConditionAssessment } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySleeperConditionAssessment;
}

export const railwaySleeperConditionAssessmentColumns = (
  onDetail: (row: RailwaySleeperConditionAssessment) => void,
  onEdit: (row: RailwaySleeperConditionAssessment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'project_id',
    headerName: t('common.table-columns.id'),
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
        {row?.project_id || 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'railway_line_section_name',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.railway_line_section_name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'inspection_dates',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.inspection_dates'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.inspection_dates ? formatDynamicDate(row?.inspection_dates) : 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'sleeper_condition_rating',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.sleeper_condition_rating'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_condition_rating || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'defect_presence',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.defect_presence'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.defect_presence || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'sleeper_stability_and_alignment',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.sleeper_stability_and_alignment'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_stability_and_alignment || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'sleepers_required_number',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.sleepers_required_number'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.sleepers_required_number != null ? row.sleepers_required_number.toLocaleString() : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'supplier_name',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.supplier_name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.supplier_name || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'supplier_phone',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.supplier_phone'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.supplier_phone || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-sleeper-condition-assessment.details.remark'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
  },
  {
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    minWidth: 180,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        <ModelAction
          model="RailwaySleeperConditionAssessment"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysleeperconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysleeperconditionassessment'
          }}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      </>
    )
  }
];
