import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { TurbineInfo } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: TurbineInfo;
}

export const turbineInfoColumns = (
  onDetail: (turbineInfo: TurbineInfo) => void,
  onEdit: (turbineInfo: TurbineInfo) => void,
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
    headerName: t('project.other.turbine-info.details.turbine-type'),
    field: 'turbine_type',
    renderCell: ({ row }: CellType) => (row.turbine_type ? row.turbine_type : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => (row.name ? row.name : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.generating-capacity'),
    field: 'generating_capacity',
    renderCell: ({ row }: CellType) => (row.generating_capacity ? `${row.generating_capacity} MW` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.designed-quantity'),
    field: 'designed_quantity',
    renderCell: ({ row }: CellType) => (row.designed_quantity ? `${row.designed_quantity} units` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.installed-quantity'),
    field: 'installed_quantity',
    renderCell: ({ row }: CellType) => (row.installed_quantity ? `${row.installed_quantity} units` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.functional-quantity'),
    field: 'functional_quantity',
    renderCell: ({ row }: CellType) => (row.functional_quantity ? `${row.functional_quantity} units` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.turbine-info.details.detail'),
    field: 'detail',
    renderCell: ({ row }: CellType) => (row.detail ? row.detail : t('common.not-available'))
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
        <ModelAction model="TurbineInfo" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'turbineinfo'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'turbineinfo'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
