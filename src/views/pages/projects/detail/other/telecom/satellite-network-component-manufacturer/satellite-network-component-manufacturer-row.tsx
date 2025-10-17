'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { SatelliteNetworkComponentManufacturer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: SatelliteNetworkComponentManufacturer;
}

export const satelliteNetworkComponentManufacturerColumns = (
  onDetail: (satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer) => void,
  onEdit: (satelliteNetworkComponentManufacturer: SatelliteNetworkComponentManufacturer) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  satelliteNetworkMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'satellite_network_id',
    headerName: t('project.other.satellite-network-component-manufacturer.details.satellite-network'),
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
        {satelliteNetworkMap.get(row?.satellite_network_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network-component-manufacturer.details.satellite'),
    field: 'satellite',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.satellite || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network-component-manufacturer.details.ground-stations'),
    field: 'ground_stations',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.ground_stations || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network-component-manufacturer.details.modems'),
    field: 'modems',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.modems || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 100,
    headerName: t('project.other.satellite-network-component-manufacturer.details.routers'),
    field: 'routers',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.routers || t('common.not-available')}</Typography>
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
          model="SatelliteNetworkComponentManufacturer"
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
            subject: 'satellitenetworkcomponentmanufacturer'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'satellitenetworkcomponentmanufacturer'
          }}
        />
      </Fragment>
    )
  }
];
