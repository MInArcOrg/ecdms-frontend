import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySubBallastMaterialTest } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySubBallastMaterialTest;
}

export const railwaySubBallastMaterialTestColumns = (
  onDetail: (row: RailwaySubBallastMaterialTest) => void,
  onEdit: (row: RailwaySubBallastMaterialTest) => void,
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
      headerName: t('project.other.railway-sub-ballast-material-test.details.railway-line-section-name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'sub_ballast_material_type_id',
      headerName: t('project.other.railway-sub-ballast-material-test.details.sub-ballast-material-type-id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_material_type_id || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'testing_method_used',
      headerName: t('project.other.railway-sub-ballast-material-test.details.testing-method-used'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.testing_method_used || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'sampling_method',
      headerName: t('project.other.railway-sub-ballast-material-test.details.sampling-method'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sampling_method || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'sample_size',
      headerName: t('project.other.railway-sub-ballast-material-test.details.sample-size'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sample_size ?? 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'material_source',
      headerName: t('project.other.railway-sub-ballast-material-test.details.material-source'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.material_source || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'sieve_analysis_results',
      headerName: t('project.other.railway-sub-ballast-material-test.details.sieve-analysis-results'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.sieve_analysis_results || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'supplier',
      headerName: t('project.other.railway-sub-ballast-material-test.details.supplier'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.supplier || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-sub-ballast-material-test.details.remark'),
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
            model="RailwaySubBallastMaterialTest"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysubballastmaterialtest' }}
            editPermissionRule={{ action: 'update', subject: 'railwaysubballastmaterialtest' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];