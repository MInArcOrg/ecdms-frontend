import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastMaterialData } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallastMaterialData;
}

export const railwayBallastMaterialDataColumns = (
  onDetail: (row: RailwayBallastMaterialData) => void,
  onEdit: (row: RailwayBallastMaterialData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'project_id',
    headerName: t('project.id'),
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
    headerName: t('project.other.railway-ballast-material-data.details.railway-line-section-name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'ballast_material_type_id',
    headerName: t('project.other.railway-ballast-material-data.details.ballast-material-type'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.ballast_material_type_id || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'particle_size_distribution_grading',
    headerName: t('project.other.railway-ballast-material-data.details.particle-size-distribution-grading'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.particle_size_distribution_grading || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'ballast_used_quantity',
    headerName: t('project.other.railway-ballast-material-data.details.ballast-used-quantity'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.ballast_used_quantity !== undefined && row?.ballast_used_quantity !== null
          ? row.ballast_used_quantity.toLocaleString(undefined, { minimumFractionDigits: 2 })
          : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'ballast_source_id',
    headerName: t('project.other.railway-ballast-material-data.details.ballast-source'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.ballast_source_id || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'ballast_material_size',
    headerName: t('project.other.railway-ballast-material-data.details.ballast-material-size'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.ballast_material_size !== undefined && row?.ballast_material_size !== null
          ? row.ballast_material_size.toLocaleString(undefined, { minimumFractionDigits: 2 })
          : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    field: 'ballast_layer_thickness',
    headerName: t('project.other.railway-ballast-material-data.details.ballast-layer-thickness'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.ballast_layer_thickness !== undefined && row?.ballast_layer_thickness !== null
          ? row.ballast_layer_thickness.toLocaleString(undefined, { minimumFractionDigits: 2 })
          : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 180,
    field: 'compaction_method_id',
    headerName: t('project.other.railway-ballast-material-data.details.compaction-method'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.compaction_method_id || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-ballast-material-data.details.remark'),
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
          model="RailwayBallastMaterialData"
          model_id={row.project_id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{ action: 'delete', subject: 'railwayballastmaterialdata' }}
          editPermissionRule={{ action: 'update', subject: 'railwayballastmaterialdata' }}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.project_id)}
          item={row}
          options={[]}
        />
      </>
    )
  }
];
