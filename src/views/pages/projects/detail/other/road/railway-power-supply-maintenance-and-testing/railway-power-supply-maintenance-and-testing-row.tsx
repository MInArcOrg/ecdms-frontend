// src/views/project/other/railway-power-supply-maintenance-and-testing/railway-power-supply-maintenance-and-testing-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerSupplyMaintenanceAndTesting } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './filet-type-config';
import CustomChip from 'src/views/components/custom/custom-chip';

interface CellType {
  row: RailwayPowerSupplyMaintenanceAndTesting;
}

const entitySubject = 'railwaypowersupplymaintenanceandtesting';

export const railwayPowerSupplyMaintenanceAndTestingColumns = (
  onDetail: (row: RailwayPowerSupplyMaintenanceAndTesting) => void,
  onEdit: (row: RailwayPowerSupplyMaintenanceAndTesting) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING';

  return [
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
      field: 'railway_station_platform_layout_id',
      headerName: t('common.table-columns.platform-layout'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railwayStationPlatformLayout?.name || row?.railway_station_platform_layout_id?.slice(0, 8) + '...' || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'recent_maintenance_records_date',
      headerName: t('project.other.railway-power-supply-maintenance-and-testing.details.recent-records-date'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.recent_maintenance_records_date ? formatDate(row.recent_maintenance_records_date) : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'maintenance_schedules_and_activities',
      headerName: t('project.other.railway-power-supply-maintenance-and-testing.details.maintenance-schedules'),
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          color={row.maintenance_schedules_and_activities ? 'success' : 'warning'}
          label={row.maintenance_schedules_and_activities ? t('common.yes') : t('common.no')}
          sx={{ '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'testing_and_commissioning_procedures',
      headerName: t('project.other.railway-power-supply-maintenance-and-testing.details.testing-procedures'),
      renderCell: ({ row }: CellType) => (
        <CustomChip
          skin='light'
          color={row.testing_and_commissioning_procedures ? 'success' : 'warning'}
          label={row.testing_and_commissioning_procedures ? t('common.yes') : t('common.no')}
          sx={{ '& .MuiChip-label': { lineHeight: '18px' } }}
        />
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || PRIMARY_FILE_TYPE} />}</>
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
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <ModelAction
            model="RailwayPowerSupplyMaintenanceAndTesting"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: entitySubject
            }}
            editPermissionRule={{
              action: 'update',
              subject: entitySubject
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
};