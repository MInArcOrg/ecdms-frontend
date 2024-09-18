import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { GeneratingCapacity } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: GeneratingCapacity;
}

export const generatingCapacityColumns = (
  onDetail: (generatingCapacity: GeneratingCapacity) => void,
  onEdit: (generatingCapacity: GeneratingCapacity) => void,
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
        {row.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.operator'),
    field: 'operator',
    renderCell: ({ row }: CellType) => (row.operator ? row.operator : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.commission-date'),
    field: 'commission_date',
    renderCell: ({ row }: CellType) => (row.commission_date ? formatCreatedAt(row.commission_date) : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.turbine-type-number'),
    field: 'turbine_type_number',
    renderCell: ({ row }: CellType) => (row.turbine_type_number !== undefined ? row.turbine_type_number : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.designed-capacity'),
    field: 'designed_capacity',
    renderCell: ({ row }: CellType) => (row.designed_capacity ? `${row.designed_capacity} MW` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.generating-capacity'),
    field: 'generating_capacity',
    renderCell: ({ row }: CellType) => (row.generating_capacity ? `${row.generating_capacity} MW` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.installed-capacity'),
    field: 'installed_capacity',
    renderCell: ({ row }: CellType) => (row.installed_capacity ? `${row.installed_capacity} MW` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.capacity-factor'),
    field: 'capacity_factor',
    renderCell: ({ row }: CellType) => (row.capacity_factor ? `${row.capacity_factor}%` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.generating-capacity.details.annual-generation'),
    field: 'annual_generation',
    renderCell: ({ row }: CellType) => (row.annual_generation ? `${row.annual_generation} GWh` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}
      </Typography>
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
          model="GeneratingCapacity"
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
            subject: 'generatingcapacity'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'generatingcapacity'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
