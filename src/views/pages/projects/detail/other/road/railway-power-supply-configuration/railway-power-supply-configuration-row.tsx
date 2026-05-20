import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerSupplyConfiguration } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayPowerSupplyConfiguration;
}

const entitySubject = 'railwaypowersupplyconfiguration'; // Subject for permissions

export const railwayPowerSupplyConfigurationColumns = (
  onDetail: (row: RailwayPowerSupplyConfiguration) => void,
  onEdit: (row: RailwayPowerSupplyConfiguration) => void,
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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'power_supply_system_type_id',
      headerName: t('project.other.railway-power-supply-configuration.details.power_supply_system_type_id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {/* Placeholder for relation, use ID if no relation exists in the type */}
          {row?.power_supply_system_type_id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'voltage_level_and_frequency',
      headerName: t('project.other.railway-power-supply-configuration.details.voltage_level_and_frequency'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row.voltage_level_and_frequency || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.3,
      minWidth: 200,
      field: 'power_supply_capacity_and_load_requirements',
      headerName: t('project.other.railway-power-supply-configuration.details.power_supply_capacity_and_load_requirements'),
      renderCell: ({ row }: CellType) => (
        <Typography noWrap sx={{ color: 'text.secondary' }}>{row.power_supply_capacity_and_load_requirements || 'N/A'}</Typography>
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
        <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || 'RAILWAY_POWER_SUPPLY_CONFIGURATION'} />}</>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}</Typography>
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
            model="RailwayPowerSupplyConfiguration"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: otherSubMenu?.model || entitySubject
            }}
            editPermissionRule={{
              action: 'update',
              subject: otherSubMenu?.model || entitySubject
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