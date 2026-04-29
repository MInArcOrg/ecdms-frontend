'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BroadcastingNetworkCoverage } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BroadcastingNetworkCoverage;
}

export const broadcastingNetworkCoverageColumns = (
  onDetail: (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => void,
  onEdit: (broadcastingNetworkCoverage: BroadcastingNetworkCoverage) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  networkInfrastructureTypeMap: Map<string, string>
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
    headerName: t('project.other.broadcasting-network-coverage.details.broadcasting-infrastructure'),
    field: 'broadcasting_infrastructure_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.broadcasting_infrastructure_id || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 160,
    headerName: t('project.other.broadcasting-network-coverage.details.network-infrastructure-type'),
    field: 'network_infrastructure_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.networkInfrastructureType?.title ||
          networkInfrastructureTypeMap.get(row?.network_infrastructure_type_id) ||
          row?.network_infrastructure_type_id ||
          t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 140,
    headerName: t('project.other.broadcasting-network-coverage.details.total-coverage-area'),
    field: 'total_coverage_area',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.total_coverage_area?.toString() || t('common.not-available')}</Typography>
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
          model="BroadcastingNetworkCoverage"
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
            subject: 'broadcastingnetworkcoverage'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'broadcastingnetworkcoverage'
          }}
        />
      </Fragment>
    )
  }
];
