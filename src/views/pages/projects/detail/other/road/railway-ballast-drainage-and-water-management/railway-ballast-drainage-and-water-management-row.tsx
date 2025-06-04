import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastDrainageAndWaterManagement } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallastDrainageAndWaterManagement;
}

export const railwayBallastDrainageAndWaterManagementColumns = (
  onDetail: (row: RailwayBallastDrainageAndWaterManagement) => void,
  onEdit: (row: RailwayBallastDrainageAndWaterManagement) => void,
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
          {row.id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.railway-line-section-name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'drainage_condition_assessment',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-condition-assessment'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.drainage_condition_assessment || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'drainage_infrastructure_type',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-type'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.drainage_infrastructure_type || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'water_management_measures',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.water-management-measures'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.water_management_measures || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 180,
      field: 'drainage_infrastructure_length',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.drainage-infrastructure-length'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.drainage_infrastructure_length != null ? row.drainage_infrastructure_length.toLocaleString() : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-ballast-drainage-and-water-management.details.remark'),
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
            model="RailwayBallastDrainageAndWaterManagement"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwayballastdrainageandwatermanagement' }}
            editPermissionRule={{ action: 'update', subject: 'railwayballastdrainageandwatermanagement' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];