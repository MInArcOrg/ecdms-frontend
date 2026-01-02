'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { TelecomInfrastructureManufacturer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: TelecomInfrastructureManufacturer;
}

export const telecomInfrastructureManufacturerColumns = (
  onDetail: (telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer) => void,
  onEdit: (telecomInfrastructureManufacturer: TelecomInfrastructureManufacturer) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  telecomInfrastructureComponentMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.telecom-infrastructure.title'),
    field: 'telecom_infrastructure_id',
    renderCell: ({ row }: CellType) => (
      <Typography
        noWrap
        component={Button}
        onClick={() => onDetail(row)}
        sx={{
          fontWeight: 500,
          textDecoration: 'none',
          color: 'text.secondary',
          '&:hover': { color: 'primary.main' },
          textTransform: 'none'
        }}
      >
        {telecomInfrastructureComponentMap.get(row.telecom_infrastructure_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.cables'),
    field: 'cables',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.cables ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.wires'),
    field: 'wires',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.wires ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.routers'),
    field: 'routers',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.routers ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.switches'),
    field: 'switches',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.switches ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.hubs'),
    field: 'hubs',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.hubs ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.repeaters'),
    field: 'repeaters',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.repeaters ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.antennas'),
    field: 'antennas',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.antennas ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.towers'),
    field: 'towers',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.towers ?? t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.25,
    minWidth: 150,
    headerName: t('project.other.telecom-infrastructure-manufacturer.details.remark'),
    field: 'remark',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.remark ? (row.remark.length > 30 ? row.remark.substring(0, 30) + '...' : row.remark) : t('common.not-available')}
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
          model="TelecomInfrastructureManufacturer"
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
            subject: 'telecominfrastructuremanufacturer'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'telecominfrastructuremanufacturer'
          }}
        />
      </Fragment>
    )
  }
];
