import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySleeperCharacteristic } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySleeperCharacteristic;
}

export const railwaySleeperCharacteristicColumns = (
  onDetail: (row: RailwaySleeperCharacteristic) => void,
  onEdit: (row: RailwaySleeperCharacteristic) => void,
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
      headerName: t('project.other.railway-sleeper-characteristic.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_type',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_type || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_size_and_dimensions',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_size_and_dimensions'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.sleeper_size_and_dimensions != null ? row.sleeper_size_and_dimensions.toLocaleString() : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_distance_between_pairs',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_distance_between_pairs'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_distance_between_pairs || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_material_specification',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_material_specification'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_material_specification || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_spacing',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_spacing'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_spacing || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'spacing_between',
      headerName: t('project.other.railway-sleeper-characteristic.details.spacing_between'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.spacing_between != null ? row.spacing_between.toLocaleString() : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'sleeper_shape',
      headerName: t('project.other.railway-sleeper-characteristic.details.sleeper_shape'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.sleeper_shape || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-sleeper-characteristic.details.remark'),
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
            model="RailwaySleeperCharacteristic"
            model_id={row.project_id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysleepercharacteristic' }}
            editPermissionRule={{ action: 'update', subject: 'railwaysleepercharacteristic' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.project_id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];