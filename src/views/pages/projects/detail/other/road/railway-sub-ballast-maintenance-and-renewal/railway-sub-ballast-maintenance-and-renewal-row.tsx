import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySubBallastMaintenanceAndRenewal } from 'src/types/project/other'; // Updated type import
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date'; // Added import for date formatting

interface CellType {
  row: RailwaySubBallastMaintenanceAndRenewal; // Updated interface type
}

export const railwaySubBallastMaintenanceAndRenewalColumns = (
  // Renamed function
  onDetail: (row: RailwaySubBallastMaintenanceAndRenewal) => void,
  onEdit: (row: RailwaySubBallastMaintenanceAndRenewal) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id', // Changed field to 'id' as it's the unique record ID
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
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.railway_line_section_name'), // Updated translation key
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 200,
    field: 'scheduled_maintenance_activities', // New field
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.scheduled_maintenance_activities'), // New translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.scheduled_maintenance_activities || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'sub_ballast_renewal_history', // New field
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.sub_ballast_renewal_history'), // New translation key
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.sub_ballast_renewal_history || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 160,
    field: 'recent_maintenance_dates', // New field
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.recent_maintenance_dates'), // New translation key
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.recent_maintenance_dates ? formatCreatedAt(row.recent_maintenance_dates) : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'inspection_reports_findings', // New field
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.inspection_reports_findings'), // New translation key
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.inspection_reports_findings || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-sub-ballast-maintenance-and-renewal.details.remark'), // Updated translation key
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
          model="RailwaySubBallastMaintenanceAndRenewal" // Updated model name
          model_id={row.id} // Use the record's ID
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaysubballastmaintenanceandrenewal'
          }} // Updated subject
          editPermissionRule={{
            action: 'update',
            subject: 'railwaysubballastmaintenanceandrenewal'
          }} // Updated subject
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id as string)} // Ensure id is string if it can be undefined
          item={row}
          options={[]}
        />
      </>
    )
  }
];
