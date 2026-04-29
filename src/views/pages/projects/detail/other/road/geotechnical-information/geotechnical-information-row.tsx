'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { GeotechnicalInformation } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { GEOTECHNICAL_INFORMATION_FILE_TYPES } from './filet-type-config';

interface CellType {
  row: GeotechnicalInformation;
}

export const geotechnicalInformationColumns = (
  onDetail: (geotechnicalInformation: GeotechnicalInformation) => void,
  onEdit: (geotechnicalInformation: GeotechnicalInformation) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
    headerName: t('common.table-columns.id'),
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
        {row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.geotechnical-information.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.name || t('common.not-available')}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.geotechnical-information.details.soil-type'),
    field: 'soil_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.soilType?.title || row?.soil_type_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.geotechnical-information.details.ground-water-impact'),
    field: 'ground_water_impact_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.groundWaterImpact?.title || row?.ground_water_impact_id || t('common.not-available')}
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
    flex: 0.12,
    minWidth: 120,
    headerName: t('common.table-columns.files'),
    field: 'file_id',
    renderCell: ({ row }: CellType) => (
      <Fragment>
        {GEOTECHNICAL_INFORMATION_FILE_TYPES.map((fileType) => (
          <FileDrawer key={fileType.key} id={row.id} type={fileType.type} />
        ))}
      </Fragment>
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
          model="GeotechnicalInformation"
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
            subject: 'geotechnicalinformation'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'geotechnicalinformation'
          }}
        />
      </Fragment>
    )
  }
];
