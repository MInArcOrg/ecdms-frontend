import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastMaterialSpecification } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallastMaterialSpecification;
}

export const railwayBallastMaterialSpecificationColumns = (
  onDetail: (row: RailwayBallastMaterialSpecification) => void,
  onEdit: (row: RailwayBallastMaterialSpecification) => void,
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
          {row.project_id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-ballast-material-specification.details.railway-line-section-name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.railway_line_section_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'ballast_material_type_id',
      headerName: t('project.other.railway-ballast-material-specification.details.ballast-material-type'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.ballast_material_type_id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'specific_gravity',
      headerName: t('project.other.railway-ballast-material-specification.details.specific-gravity'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.specific_gravity != null
            ? row.specific_gravity.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'porosity',
      headerName: t('project.other.railway-ballast-material-specification.details.porosity'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.porosity != null
            ? row.porosity.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'water_absorption',
      headerName: t('project.other.railway-ballast-material-specification.details.water-absorption'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.water_absorption != null
            ? row.water_absorption.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'shape',
      headerName: t('project.other.railway-ballast-material-specification.details.shape'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.shape || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'average_particle_length',
      headerName: t('project.other.railway-ballast-material-specification.details.average-particle-length'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.average_particle_length != null
            ? row.average_particle_length.toLocaleString(undefined, { minimumFractionDigits: 2 })
            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-ballast-material-specification.details.remark'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.remark || 'N/A'}
        </Typography>
      )
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
            model="RailwayBallastMaterialSpecification"
            model_id={row.project_id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwayballastmaterialspecification' }}
            editPermissionRule={{ action: 'update', subject: 'railwayballastmaterialspecification' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.project_id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
