'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ElectricGridControlCenterPerformanceAndMaintenance } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ElectricGridControlCenterPerformanceAndMaintenance;
}

export const electricGridControlCenterPerformanceAndMaintenanceColumns = (
  onDetail: (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => void,
  onEdit: (electricGridControlCenterPerformanceAndMaintenance: ElectricGridControlCenterPerformanceAndMaintenance) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  electricGridControlCenterDataMap: Map<string, string>,
  maintenanceFrequenciesMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('project.other.electric-grid-control-center-performance-and-maintenance.details.name'),
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
        {row?.name || row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-grid-control-center-performance-and-maintenance.details.electric-grid-control-center-data-id'),
    field: 'electric_grid_control_center_data_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.electric_grid_control_center_data_id
          ? electricGridControlCenterDataMap.get(row.electric_grid_control_center_data_id) || row.electric_grid_control_center_data_id
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.electric-grid-control-center-performance-and-maintenance.details.maintenance-frequency-id'),
    field: 'maintenance_frequency_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.maintenance_frequency_id
          ? maintenanceFrequenciesMap.get(row.maintenance_frequency_id) || row.maintenance_frequency_id
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.electric-grid-control-center-performance-and-maintenance.details.total-system-downtime-outage-duration'),
    field: 'total_system_downtime_outage_duration',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.total_system_downtime_outage_duration !== undefined ? row.total_system_downtime_outage_duration : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="ElectricGridControlCenterPerformanceAndMaintenance"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'electricgridcontrolcenterperformanceandmaintenance'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'electricgridcontrolcenterperformanceandmaintenance'
          }}
        />
      </Fragment>
    )
  }
];
