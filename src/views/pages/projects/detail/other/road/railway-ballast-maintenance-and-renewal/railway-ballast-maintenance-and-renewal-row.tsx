import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallastMaintenanceAndRenewal } from 'src/types/project/other'; // Updated type import
import { formatDynamicDate } from 'src/utils/formatter/date'; // Added import for date formatting
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallastMaintenanceAndRenewal; // Updated interface type
}

export const railwayBallastMaintenanceAndRenewalColumns = (
  // Renamed function
  onDetail: (row: RailwayBallastMaintenanceAndRenewal) => void,
  onEdit: (row: RailwayBallastMaintenanceAndRenewal) => void,
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
    headerName: t('project.other.railway-ballast-maintenance-and-renewal.details.railway-line-section-name'), // Updated translation key
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'scheduled_maintenance_activities',
    headerName: t('project.other.railway-ballast-maintenance-and-renewal.details.scheduled-maintenance-activities'), // New field
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.scheduled_maintenance_activities || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 180,
    field: 'recent_maintenance_dates',
    headerName: t('project.other.railway-ballast-maintenance-and-renewal.details.recent-maintenance-dates'), // New field
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.recent_maintenance_dates ? formatDynamicDate(row.recent_maintenance_dates) : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'inspection_reports_findings',
    headerName: t('project.other.railway-ballast-maintenance-and-renewal.details.inspection-reports-findings'), // New field
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.inspection_reports_findings || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-ballast-maintenance-and-renewal.details.remark'), // Updated translation key
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
          model="RailwayBallastMaintenanceAndRenewal" // Updated model name
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayballastmaintenanceandrenewal'
          }} // Updated subject
          editPermissionRule={{
            action: 'update',
            subject: 'railwayballastmaintenanceandrenewal'
          }} // Updated subject
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
        />
      </>
    )
  }
];
