import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { WeatherCondition } from 'src/types/project/weather-condition';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: WeatherCondition;
}

export const weatherConditionColumns = (
  onDetail: (weatherCondition: WeatherCondition) => void,
  onEdit: (weatherCondition: WeatherCondition) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 200,
    field: 'weather_type',
    headerName: t('project.other.weather-condition.weather-type'),
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
        {row.weather_type}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'description',
    headerName: t('project.other.weather-condition.description'),
    renderCell: ({ row }: CellType) => row.description
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'created_at',
    headerName: t('common.created-at'),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row?.id || '')}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'weathercondition'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'weathercondition'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
