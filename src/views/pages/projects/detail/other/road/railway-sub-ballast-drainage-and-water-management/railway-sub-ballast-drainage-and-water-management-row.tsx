import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySubBallastDrainageAndWaterManagement } from 'src/types/project/other'; // Updated type import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwaySubBallastDrainageAndWaterManagement; // Updated interface type
}

export const railwaySubBallastDrainageAndWaterManagementColumns = ( // Renamed function
  onDetail: (row: RailwaySubBallastDrainageAndWaterManagement) => void, // Updated parameter type
  onEdit: (row: RailwaySubBallastDrainageAndWaterManagement) => void, // Updated parameter type
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'id', // Changed field to 'id' as per the model
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
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.railway_line_section_name'), // Updated translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'drainage_condition_assessment', // New field
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_condition_assessment'), // New translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.drainage_condition_assessment || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'drainage_infrastructure_type', // New field
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_type'), // New translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.drainage_infrastructure_type || 'N/A'}</Typography>
    },
    {
      flex: 0.25,
      minWidth: 250,
      field: 'water_management_measures', // New field
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.water_management_measures'), // New translation key
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.water_management_measures || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'drainage_infrastructure_length', // New field
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.drainage_infrastructure_length'), // New translation key
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
      headerName: t('project.other.railway-sub-ballast-drainage-and-water-management.details.remark'), // Updated translation key
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
            model="RailwaySubBallastDrainageAndWaterManagement" // Updated model name
            model_id={row.id as string} // Using 'id' for model_id
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysubballastdrainageandwatermanagement' }} // Updated subject
            editPermissionRule={{ action: 'update', subject: 'railwaysubballastdrainageandwatermanagement' }} // Updated subject
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id as string)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];