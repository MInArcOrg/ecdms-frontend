'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BridgeFoundation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BridgeFoundation;
}

export const bridgeFoundationColumns = (
  onDetail: (bridgeFoundation: BridgeFoundation) => void,
  onEdit: (bridgeFoundation: BridgeFoundation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  abutmentTypeMap: Map<string, string>,
  pierTypeMap: Map<string, string>,
  soilTypeMap: Map<string, string>
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t('project.other.bridge-foundation.details.name'),
      field: 'name',
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
          {row?.name}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-foundation.details.bridge-name'),
      field: 'bridge_name',
      renderCell: ({ row }: CellType) => row.bridge_name || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-foundation.details.abutment-type-id'),
      field: 'abutment_type_id',
      renderCell: ({ row }: CellType) => {
        const name = abutmentTypeMap.get(row.abutment_type_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-foundation.details.pier-type-id'),
      field: 'pier_type_id',
      renderCell: ({ row }: CellType) => {
        const name = pierTypeMap.get(row.pier_type_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-foundation.details.soil-type-id'),
      field: 'soil_type_id',
      renderCell: ({ row }: CellType) => {
        const name = soilTypeMap.get(row.soil_type_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
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
            model="BridgeFoundation"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'bridgefoundation'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'bridgefoundation'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
};
