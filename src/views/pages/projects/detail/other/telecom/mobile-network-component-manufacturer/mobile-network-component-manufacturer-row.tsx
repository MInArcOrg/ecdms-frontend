'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ManufacturerOfMobileNetworkComponent } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ManufacturerOfMobileNetworkComponent;
}

export const mobileNetworkComponentManufacturerColumns = (
  onDetail: (row: ManufacturerOfMobileNetworkComponent) => void,
  onEdit: (row: ManufacturerOfMobileNetworkComponent) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  telecomInfrastructureComponentMap: Map<string, string>
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.other.mobile-network-component-manufacturer.details.mobile_network_id'),
      field: 'mobile_network_id',
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
          {telecomInfrastructureComponentMap.get(row.mobile_network_id) || t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: t('project.other.mobile-network-component-manufacturer.details.cell'),
      field: 'cell',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.cell ?? t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: t('project.other.mobile-network-component-manufacturer.details.towers'),
      field: 'towers',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.towers ?? t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: t('project.other.mobile-network-component-manufacturer.details.antennas'),
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
      headerName: t('project.other.mobile-network-component-manufacturer.details.base-stations'),
      field: 'base_stations',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.base_stations ?? t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: t('project.other.mobile-network-component-manufacturer.details.repeaters'),
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
      headerName: t('project.other.mobile-network-component-manufacturer.details.switches'),
      field: 'switches',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.switches ?? t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 150,
      headerName: t('project.other.mobile-network-component-manufacturer.details.others'),
      field: 'others',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.others ? (row.others.length > 30 ? row.others.substring(0, 30) + '...' : row.others) : t('common.not-available')}
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
            model="ManufacturerOfMobileNetworkComponent"
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
              subject: 'manufacturerofmobilenetworkcomponent'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'manufacturerofmobilenetworkcomponent'
            }}
          />
        </Fragment>
      )
    }
  ];
