import { Button, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetworkCoverage } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SatelliteNetworkCoverage;
}

export const satelliteNetworkCoverageColumns = (
  onDetail: (satelliteNetworkCoverage: SatelliteNetworkCoverage) => void,
  onEdit: (satelliteNetworkCoverage: SatelliteNetworkCoverage) => void,
  onDelete: (id: string) => void,
  t: (key: string) => string,
  refetch: () => void,
  networkTypeMap: Map<string, string>,
  satelliteNetworkMap: Map<string, string>,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 140,
    headerName: t('project.other.satellite-network.title'),
    field: 'satellite_network_id',
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
        {satelliteNetworkMap.get(row.satellite_network_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    headerName: t('project.other.satellite-network-coverage.details.network-infrastructure-type-id'),
    field: 'network_infrastructure_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {networkTypeMap.get(row.network_infrastructure_type_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.14,
    minWidth: 130,
    headerName: t('project.other.satellite-network-coverage.details.total-coverage-area'),
    field: 'total_coverage_area',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.total_coverage_area?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.14,
    minWidth: 130,
    headerName: t('project.other.satellite-network-coverage.details.coverage-population-no'),
    field: 'coverage_population_no',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.coverage_population_no?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.14,
    minWidth: 130,
    headerName: t('project.other.satellite-network-coverage.details.active-users-no'),
    field: 'active_users_no',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.active_users_no?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="SatelliteNetworkCoverage"
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
            subject: otherSubMenu?.model || ''
          }}
          editPermissionRule={{
            action: 'update',
            subject: otherSubMenu?.model || ''
          }}
        />
      </Fragment>
    )
  }
];
