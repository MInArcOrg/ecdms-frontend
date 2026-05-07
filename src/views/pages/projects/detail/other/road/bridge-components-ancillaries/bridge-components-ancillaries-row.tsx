'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BridgeComponentAndAncillaries } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BridgeComponentAndAncillaries;
}

export const bridgeComponentsAncillariesColumns = (
  onDetail: (item: BridgeComponentAndAncillaries) => void,
  onEdit: (item: BridgeComponentAndAncillaries) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 160,
    field: 'bridge_id',
    headerName: 'Bridge Name',
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
        {row?.bridgeBasicData?.name || row?.bridge_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.18,
    minWidth: 160,
    field: 'expansion_joint_type_id',
    headerName: 'Expansion Joint Type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.expansionJointType?.title || row?.expansion_joint_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.18,
    minWidth: 160,
    field: 'guard_railing_type_id',
    headerName: 'Guard Railing Type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.guardRailType?.title || row?.guard_railing_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.16,
    minWidth: 160,
    field: 'abutment_bearing_type_id',
    headerName: 'Abutment Bearing Type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.abutment_bearing_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.16,
    minWidth: 160,
    field: 'piers_bearing_type_id',
    headerName: 'Piers Bearing Type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.piers_bearing_type_id || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.16,
    minWidth: 140,
    field: 'surface_type_id',
    headerName: 'Surface Type',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.surfaceType?.title || row?.surface_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.18,
    minWidth: 150,
    field: 'created_at',
    headerName: t('common.table-columns.created-at'),
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
          model="BridgeComponentAndAncillaries"
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
            subject: 'bridgecomponentandancillary'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'bridgecomponentandancillary'
          }}
        />
      </Fragment>
    )
  }
];

