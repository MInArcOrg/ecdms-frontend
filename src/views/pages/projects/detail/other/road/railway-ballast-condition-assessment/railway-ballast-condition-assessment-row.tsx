import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastConditionAssessment } from 'src/types/project/other'; // Updated type import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date'; // Added import for date formatting

interface CellType {
  row: RailwayBallastConditionAssessment; // Updated interface type
}

export const railwayBallastConditionAssessmentColumns = (
  // Renamed function
  onDetail: (row: RailwayBallastConditionAssessment) => void,
  onEdit: (row: RailwayBallastConditionAssessment) => void,
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
          {row.id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-ballast-condition-assessment.details.railway-line-section-name'), // Updated translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'inspection_dates',
      headerName: t('project.other.railway-ballast-condition-assessment.details.inspection-dates'), // New field
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.inspection_dates ? formatCreatedAt(row.inspection_dates) : 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'ballast_condition_rating',
      headerName: t('project.other.railway-ballast-condition-assessment.details.ballast-condition-rating'), // New field
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.ballast_condition_rating || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'fouling_presence',
      headerName: t('project.other.railway-ballast-condition-assessment.details.fouling-presence'), // New field
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.fouling_presence || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'ballast_degradation_indicators',
      headerName: t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-indicators'), // New field
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.ballast_degradation_indicators || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'ballast_quality_testing_method',
      headerName: t('project.other.railway-ballast-condition-assessment.details.ballast-quality-testing-method'), // New field
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.ballast_quality_testing_method || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'testing_frequency',
      headerName: t('project.other.railway-ballast-condition-assessment.details.testing-frequency'), // New field
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.testing_frequency != null ? row.testing_frequency.toLocaleString() : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'ballast_resistance',
      headerName: t('project.other.railway-ballast-condition-assessment.details.ballast-resistance'), // New field
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.ballast_resistance || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'ballast_degradation_rate',
      headerName: t('project.other.railway-ballast-condition-assessment.details.ballast-degradation-rate'), // New field
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.ballast_degradation_rate || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'drainage_performance',
      headerName: t('project.other.railway-ballast-condition-assessment.details.drainage-performance'), // New field
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.drainage_performance || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-ballast-condition-assessment.details.remark'), // Updated translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.remark || 'N/A'}</Typography>
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
            model="RailwayBallastConditionAssessment" // Updated model name
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwayballastconditionassessment' }} // Updated subject
            editPermissionRule={{ action: 'update', subject: 'railwayballastconditionassessment' }} // Updated subject
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
