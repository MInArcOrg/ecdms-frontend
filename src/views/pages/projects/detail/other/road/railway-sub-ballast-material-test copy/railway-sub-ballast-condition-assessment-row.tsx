import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySubBallastConditionAssessment } from 'src/types/project/other';
import { formatDynamicDate } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySubBallastConditionAssessment;
}

export const railwaySubBallastConditionAssessmentColumns = (
  onDetail: (row: RailwaySubBallastConditionAssessment) => void,
  onEdit: (row: RailwaySubBallastConditionAssessment) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'id',
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
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'sub_ballast_material_type_id',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_material_type_id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_material_type_id || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'inspection_dates',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.inspection_dates'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.inspection_dates ? formatDynamicDate(row?.inspection_dates) : 'N/A'
        }</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'sub_ballast_condition_rating',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_condition_rating'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_condition_rating || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'cracking_observations',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.cracking_observations'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.cracking_observations || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'erosion_issues',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.erosion_issues'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.erosion_issues || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'unwanted_vegetation_presence',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.unwanted_vegetation_presence'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.unwanted_vegetation_presence || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'testing_frequency_per_year',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.testing_frequency_per_year'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.testing_frequency_per_year ?? 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'sub_ballast_resistance',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_resistance'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_resistance || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'sub_ballast_degradation_rate',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.sub_ballast_degradation_rate'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_degradation_rate || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'drainage_performance',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.drainage_performance'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.drainage_performance || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-sub-ballast-condition-assessment.details.remark'),
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
            model="RailwaySubBallastConditionAssessment"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysubballastconditionassessment' }}
            editPermissionRule={{ action: 'update', subject: 'railwaysubballastconditionassessment' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];