import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemMaintenanceAndReplacement } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayFasteningSystemMaintenanceAndReplacement;
}

export const railwayFasteningSystemMaintenanceAndReplacementColumns = (
  onDetail: (row: RailwayFasteningSystemMaintenanceAndReplacement) => void,
  onEdit: (row: RailwayFasteningSystemMaintenanceAndReplacement) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild // This parameter is still useful for context but not for direct fileType
): GridColDef[] => [
    {
      flex: 0.1,
      minWidth: 80,
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
          {row?.id?.toString().slice(0, 5) || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'railway_line_section_name',
      headerName: t(
        'project.other.railway-fastening-system-maintenance-and-replacement.details.railway_line_section_name'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railway_line_section_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'scheduled_maintenance_activities',
      headerName: t(
        'project.other.railway-fastening-system-maintenance-and-replacement.details.scheduled_maintenance_activities'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.scheduled_maintenance_activities || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'recent_maintenance_records_and_dates',
      headerName: t('project.other.railway-fastening-system-maintenance-and-replacement.details.recent_maintenance_records_and_dates'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.recent_maintenance_records_and_dates}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-fastening-system-maintenance-and-replacement.details.remark'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
      )
    },
    // New column for Inspection Reports and Findings
    {
      flex: 0.1,
      minWidth: 120,
      field: 'inspection_reports_files',
      headerName: t('project.other.railway-fastening-system-maintenance-and-replacement.details.inspection_reports_and_findings'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer id={row.id} type={'INSPECTION_REPORTS_AND_FINDINGS'} />
          )}
        </>
      )
    },
    // New column for Fastening System Replacement History
    {
      flex: 0.1,
      minWidth: 120,
      field: 'replacement_history_files',
      headerName: t('project.other.railway-fastening-system-maintenance-and-replacement.details.fastening_system_replacement_history'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer id={row.id} type={'FASTENING_SYSTEM_REPLACEMENT_HISTORY'} />
          )}
        </>
      )
    },
    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250, // Adjust minWidth if needed to accommodate new columns
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (

        <>
          <FileDrawer id={row.id} type={otherSubMenu?.fileType || ""} />

          <ModelAction
            model="RailwayFasteningSystemMaintenanceAndReplacement"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayfasteningsystemmaintenanceandreplacement'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayfasteningsystemmaintenanceandreplacement'
            }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id as string)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];