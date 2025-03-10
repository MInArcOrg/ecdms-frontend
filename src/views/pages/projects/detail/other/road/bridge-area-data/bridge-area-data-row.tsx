'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { BridgeAreaData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BridgeAreaData;
}

export const bridgeAreaDataColumns = (
  onDetail: (bridgeAreaData: BridgeAreaData) => void,
  onEdit: (bridgeAreaData: BridgeAreaData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  areaTopographyMap: Map<string, string>
): GridColDef[] => {
  return [
    {
      flex: 0.15,
      minWidth: 150,
      headerName: t('project.other.bridge-area-data.details.name'),
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
      headerName: t('project.other.bridge-area-data.details.bridge-name'),
      field: 'bridge_name',
      renderCell: ({ row }: CellType) => row.bridge_name || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-area-data.details.river-width'),
      field: 'river_width',
      renderCell: ({ row }: CellType) => row.river_width?.toString() || t('common.not-available')
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-area-data.details.area-topography-id'),
      field: 'area_topography_id',
      renderCell: ({ row }: CellType) => {
        const name = areaTopographyMap.get(row.area_topography_id);
        return name || t('common.not-available');
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-area-data.details.detour-possibility'),
      field: 'detour_possibility',
      renderCell: ({ row }: CellType) => (row.detour_possibility ? t('common.yes') : t('common.no'))
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.bridge-area-data.details.load-limit-sign'),
      field: 'load_limit_sign',
      renderCell: ({ row }: CellType) => (row.load_limit_sign ? t('common.yes') : t('common.no'))
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
            model="BridgeAreaData"
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
              subject: 'bridgeareadata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'bridgeareadata'
            }}
            options={[]}
          />
        </Fragment>
      )
    }
  ];
};
