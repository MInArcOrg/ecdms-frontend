'use client';

import { Button, Chip } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { SatelliteNetwork } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SatelliteNetwork;
}

export const satelliteNetworkColumns = (
  onDetail: (satelliteNetwork: SatelliteNetwork) => void,
  onEdit: (satelliteNetwork: SatelliteNetwork) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  satelliteNetworkTypeMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('project.other.satellite-network.details.name'),
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
        {row?.name || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'satellite_network_type_id',
    headerName: t('project.other.satellite-network.details.satellite-network-type'),
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
        {satelliteNetworkTypeMap.get(row?.satellite_network_type_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network.details.satellite'),
    field: 'satellite',
    renderCell: ({ row }: CellType) => (
      <Chip size="small" label={row?.satellite ? t('common.yes') : t('common.no')} color={row?.satellite ? 'success' : 'default'} />
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network.details.ground-stations'),
    field: 'ground_stations',
    renderCell: ({ row }: CellType) => (
      <Chip
        size="small"
        label={row?.ground_stations ? t('common.yes') : t('common.no')}
        color={row?.ground_stations ? 'success' : 'default'}
      />
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network.details.modems'),
    field: 'modems',
    renderCell: ({ row }: CellType) => (
      <Chip size="small" label={row?.modems ? t('common.yes') : t('common.no')} color={row?.modems ? 'success' : 'default'} />
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network.details.routers'),
    field: 'routers',
    renderCell: ({ row }: CellType) => (
      <Chip size="small" label={row?.routers ? t('common.yes') : t('common.no')} color={row?.routers ? 'success' : 'default'} />
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
          model="SatelliteNetwork"
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
            subject: 'satellitenetwork'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'satellitenetwork'
          }}
        />
      </Fragment>
    )
  }
];
