'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ThermalBiomassIncinerationData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ThermalBiomassIncinerationData;
}

export const thermalBiomassIncinerationColumns = (
  onDetail: (data: ThermalBiomassIncinerationData) => void,
  onEdit: (data: ThermalBiomassIncinerationData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  thermalTypeMap: Map<string, string>,
  fuelSourceMap: Map<string, string>
): GridColDef[] => [
    {
      flex: 0.2,
      minWidth: 150,
      field: 'type_id',
      headerName: t('project.other.thermal-biomass-incineration.form.type'),
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
          {thermalTypeMap.get(row.type_id) || row.id.slice(0, 8) + '...'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.other.thermal-biomass-incineration.form.fuel-source'),
      field: 'fuel_source_id',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{fuelSourceMap.get(row.fuel_source_id) || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.thermal-biomass-incineration.form.heat-rate-at-max-capacity'),
      field: 'heat_rate_at_max_capacity',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row.heat_rate_at_max_capacity !== undefined ? row.heat_rate_at_max_capacity : t('common.not-available')}
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
            model="ThermalBiomassIncinerationData"
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
              subject: 'thermalbiomassincinerationdata'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'thermalbiomassincinerationdata'
            }}
          />
        </Fragment>
      )
    }
  ];
