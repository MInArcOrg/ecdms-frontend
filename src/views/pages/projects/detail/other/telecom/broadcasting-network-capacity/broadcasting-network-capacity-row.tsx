'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BroadcastingNetworkCapacity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BroadcastingNetworkCapacity;
}

export const broadcastingNetworkCapacityColumns = (
  onDetail: (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => void,
  onEdit: (broadcastingNetworkCapacity: BroadcastingNetworkCapacity) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  networkTypeMap: Map<string, string>,
  broadcastingInfrastructureMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
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
        {row?.id?.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.broadcasting-network-capacity.details.broadcasting-infrastructure'),
    field: 'broadcasting_infrastructure_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.broadcastingInfrastructure?.name ||
          broadcastingInfrastructureMap.get(row?.broadcasting_infrastructure_id) ||
          row?.broadcasting_infrastructure_id ||
          t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.broadcasting-network-capacity.details.network-type'),
    field: 'network_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.networkType?.title || networkTypeMap.get(row?.network_type_id) || row?.network_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    headerName: t('project.other.broadcasting-network-capacity.details.total-bandwidth'),
    field: 'total_bandwidth',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.total_bandwidth?.toString() || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at as any) : t('common.not-available')}</Typography>
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
          model="BroadcastingNetworkCapacity"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'broadcastingnetworkcapacity'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'broadcastingnetworkcapacity'
          }}
        />
      </Fragment>
    )
  }
];
