'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BridgeSubStructure } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BridgeSubStructure;
}

export const bridgeSubStructureColumns = (
  onDetail: (bridgeSubStructure: BridgeSubStructure) => void,
  onEdit: (bridgeSubStructure: BridgeSubStructure) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  pierTypeMap: Map<string, string>
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t('project.other.bridge-sub-structure.details.name'),
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
      headerName: t('project.other.bridge-sub-structure.details.bridge-name'),
      field: 'bridge_name',
      renderCell: ({ row }: CellType) => row.bridge_name || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-sub-structure.details.pier-type-id'),
      field: 'pier_type_id',
      renderCell: ({ row }: CellType) => {
        const name = pierTypeMap.get(row.pier_type_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-sub-structure.details.piers-number'),
      field: 'piers_number',
      renderCell: ({ row }: CellType) => row.piers_number?.toString() || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-sub-structure.details.wing-wall-length'),
      field: 'wing_wall_length',
      renderCell: ({ row }: CellType) => row.wing_wall_length?.toString() || t('common.not-available')
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
            model="BridgeSubStructure"
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
              subject: 'bridgesubstructure'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'bridgesubstructure'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
};
