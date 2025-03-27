'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { TelecomInfrastructureComponent } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: TelecomInfrastructureComponent;
}

export const telecomInfrastructureComponentColumns = (
  onDetail: (telecomInfrastructureComponent: TelecomInfrastructureComponent) => void,
  onEdit: (telecomInfrastructureComponent: TelecomInfrastructureComponent) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  mobileNetworkTypeMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'mobile_network_type_id',
    headerName: t('project.other.telecom-infrastructure-component.details.mobile-network-type'),
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
        {mobileNetworkTypeMap.get(row?.mobile_network_type_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t('project.other.telecom-infrastructure-component.details.cables'),
    field: 'cables',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.cables?.toString() || '0'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t('project.other.telecom-infrastructure-component.details.wires'),
    field: 'wires',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.wires?.toString() || '0'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t('project.other.telecom-infrastructure-component.details.routers'),
    field: 'routers',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.routers?.toString() || '0'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 80,
    headerName: t('project.other.telecom-infrastructure-component.details.antennas'),
    field: 'antennas',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.antennas?.toString() || '0'}</Typography>
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
          model="TelecomInfrastructureComponent"
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
            subject: 'telecominfrastructurecomponent'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'telecominfrastructurecomponent'
          }}
        />
      </Fragment>
    )
  }
];
