import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayCommunicationSystemMaintenanceAndTesting } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayCommunicationSystemMaintenanceAndTesting;
}

export const railwayCommunicationSystemMaintenanceAndTestingColumns = (
  onDetail: (row: RailwayCommunicationSystemMaintenanceAndTesting) => void,
  onEdit: (row: RailwayCommunicationSystemMaintenanceAndTesting) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild
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
        'project.other.railway-communication-system-maintenance-and-testing.details.railway_line_section_name'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railway_line_section_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'scheduled_maintenance_activities',
      headerName: t(
        'project.other.railway-communication-system-maintenance-and-testing.details.scheduled_maintenance_activities'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.scheduled_maintenance_activities || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'inspections',
      headerName: t(
        'project.other.railway-communication-system-maintenance-and-testing.details.inspections'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.inspections ? 'Yes' : 'No'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'recent_maintenance_records_and_dates',
      headerName: t(
        'project.other.railway-communication-system-maintenance-and-testing.details.recent_maintenance_records_and_dates'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.recent_maintenance_records_and_dates || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'testing_and_verification_procedures_prepared',
      headerName: t(
        'project.other.railway-communication-system-maintenance-and-testing.details.testing_and_verification_procedures_prepared'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.testing_and_verification_procedures_prepared ? 'Yes' : 'No'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 250,
      field: 'maintenance_contracts_or_agreements_made',
      headerName: t(
        'project.other.railway-communication-system-maintenance-and-testing.details.maintenance_contracts_or_agreements_made'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.maintenance_contracts_or_agreements_made || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-communication-system-maintenance-and-testing.details.remark'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'maintenance-contracts-file-upload',
      headerName: t('project.other.railway-communication-system-maintenance-and-testing.details.maintenance-contracts-file-upload'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.id ? (
            <FileDrawer
              id={row.id}
              type={'MAINTENANCE_AND_TESTING_CONTRACTS_AGREEMENT' || ''}
            />
          ) : (
            'N/A'
          )}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer
              id={row.id}
              type={otherSubMenu?.fileType || ''}
            />

          )}
        </>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'updated_at',
      headerName: t('common.table-columns.updated-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.updated_at ? formatCreatedAt(row.updated_at) : 'N/A'}
        </Typography>
      )
    },
    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <ModelAction
            model="RailwayCommunicationSystemMaintenanceAndTesting"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwaycommunicationsystemmaintenanceandtesting'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaycommunicationsystemmaintenanceandtesting'
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