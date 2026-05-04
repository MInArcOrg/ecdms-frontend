'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { CulvertRoadOverInformation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: CulvertRoadOverInformation;
}

export const culvertRoadOverInformationColumns = (
  onDetail: (culvertRoadOverInformation: CulvertRoadOverInformation) => void,
  onEdit: (culvertRoadOverInformation: CulvertRoadOverInformation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
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
        t('common.table-columns.details')
      </Typography>
    )
  },

  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.culvert-road-over-information.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.culvert-road-over-information.details.carriage-way-width'),
    field: 'carriage_way_width',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.carriage_way_width || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.culvert-road-over-information.details.lane-number'),
    field: 'lane_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.lane_number || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.culvert-road-over-information.details.guard-rail-type-id'),
    field: 'guard_rail_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.guard_rail_type_id || t('common.not-available')}</Typography>
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
          model="CulvertRoadOverInformation"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'culvertroadoverinformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'culvertroadoverinformation'
          }}
        />
      </Fragment>
    )
  }
];
