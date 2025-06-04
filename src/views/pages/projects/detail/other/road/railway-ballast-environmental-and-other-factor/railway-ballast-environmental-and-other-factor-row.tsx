import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastEnvironmentalAndOtherFactor } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallastEnvironmentalAndOtherFactor;
}

export const railwayBallastEnvironmentalAndOtherFactorColumns = (
  onDetail: (row: RailwayBallastEnvironmentalAndOtherFactor) => void,
  onEdit: (row: RailwayBallastEnvironmentalAndOtherFactor) => void,
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
      headerName: t('project.other.railway-ballast-environmental-and-other-factor.details.railway-line-section-name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_compliance_measures',
      headerName: t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-compliance-measures'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.environmental_compliance_measures || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_impact_assessment',
      headerName: t('project.other.railway-ballast-environmental-and-other-factor.details.environmental-impact-assessment'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.environmental_impact_assessment || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-ballast-environmental-and-other-factor.details.remark'),
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
            model="RailwayBallastEnvironmentalAndOtherFactor"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwayballastenvironmental-and-other-factor' }}
            editPermissionRule={{ action: 'update', subject: 'railwayballastenvironmental-and-other-factor' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];