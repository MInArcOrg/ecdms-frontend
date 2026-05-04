import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { EnvironmentalControl } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: EnvironmentalControl;
}

export const environmentalControlColumns = (
  onDetail: (environmentalControl: EnvironmentalControl) => void,
  onEdit: (environmentalControl: EnvironmentalControl) => void,
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
    headerName: t('project.other.environmental-control.details.data-center-id'),
    field: 'data_center_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.dataCenter?.name || row?.data_center_id || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.environmental-control.details.temperature'),
    field: 'temperature',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.temperature || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.environmental-control.details.humidity'),
    field: 'humidity',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.humidity || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.environmental-control.details.air-quality'),
    field: 'air_quality',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.air_quality || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.environmental-control.details.others'),
    field: 'others',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.others || t('common.not-available')}</Typography>
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
          model="EnvironmentalControl"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={function (): void {
            throw new Error('Function not implemented.');
          }}
          title=""
          postAction={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'environmentalcontrol'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'environmentalcontrol'
          }}
        />
      </Fragment>
    )
  }
];
