'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BroadcastingInfrastructureManufacturer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BroadcastingInfrastructureManufacturer;
}

export const broadcastingInfrastructureManufacturerColumns = (
  onDetail: (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => void,
  onEdit: (broadcastingInfrastructureManufacturer: BroadcastingInfrastructureManufacturer) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
 {
    flex: 0.2,
    minWidth: 150,
    field: 'broadcasting_infrastructure_id',
    headerName: t('project.other.broadcasting-infrastructure-age.details.broadcasting-infrastructure'),
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
        {row?.broadcastingInfrastructure?.name ||
          t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.broadcasting-infrastructure-manufacturer.details.antennas'),
    field: 'antennas',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.antennas || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.broadcasting-infrastructure-manufacturer.details.transmitters"),cturer.details.transmitters'),
    field: 'transmitters',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.transmitters || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.broadcasting-infrastructure-manufacturer.details.towers'),
    field: 'towers',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.towers || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.broadcasting-infrastructure-manufacturer.details.cables'),
    field: 'cables',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.cables || t('common.not-available')}</Typography>
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
          model="BroadcastingInfrastructureManufacturer"
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
            subject: 'broadcastinginfrastructuremanufacturer'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'broadcastinginfrastructuremanufacturer'
          }}
        />
      </Fragment>
    )
  }
];
