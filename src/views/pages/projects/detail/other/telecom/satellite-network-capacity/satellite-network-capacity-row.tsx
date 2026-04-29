import { Button, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { SatelliteNetworkCapacity } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SatelliteNetworkCapacity;
}

export const satelliteNetworkCapacityColumns = (
  onDetail: (satelliteNetworkCapacity: SatelliteNetworkCapacity) => void,
  onEdit: (satelliteNetworkCapacity: SatelliteNetworkCapacity) => void,
  onDelete: (id: string) => void,
  t: (key: string) => string,
  refetch: () => void,
  networkTypeMap: Map<string, string>,
  satelliteNetworkMap: Map<string, string>,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
  {
    flex: 0.18,
    minWidth: 160,
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
    flex: 0.18,
    minWidth: 160,
    headerName: t('project.other.satellite-network-capacity.details.network-type-id'),
    field: 'network_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{networkTypeMap.get(row.network_type_id) || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.16,
    minWidth: 140,
    headerName: t('project.other.satellite-network-capacity.details.total-bandwidth'),
    field: 'total_bandwidth',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.total_bandwidth?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.16,
    minWidth: 140,
    headerName: t('project.other.satellite-network-capacity.details.users-number'),
    field: 'users_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.users_number?.toString() || t('common.not-available')}</Typography>
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
          model="SatelliteNetworkCapacity"
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

