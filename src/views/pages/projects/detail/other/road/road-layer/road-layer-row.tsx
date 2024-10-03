import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { RoadLayer } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RoadLayer;
}

export const roadLayerColumns = (
  onDetail: (roadLayer: RoadLayer) => void,
  onEdit: (roadLayer: RoadLayer) => void,
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
    headerName: t('project.other.road-layer.details.segment'),
    field: 'roadsegment',
    renderCell: ({ row }: CellType) => (row.roadsegment ? row.roadsegment?.name : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => (row.name ? row.name : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.specifications'),
    field: 'specifications',
    renderCell: ({ row }: CellType) => (row.specifications ? row.specifications : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.number'),
    field: 'number',
    renderCell: ({ row }: CellType) => (row.number !== undefined ? row.number : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.thickness'),
    field: 'thickness',
    renderCell: ({ row }: CellType) => (row.thickness !== undefined ? `${row.thickness} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.material'),
    field: 'material',
    renderCell: ({ row }: CellType) => (row.material ? row.material : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-layer.details.description'),
    field: 'description',
    renderCell: ({ row }: CellType) => (row.description ? row.description : t('common.not-available'))
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
        <ModelAction model="RoadLayer" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadlayer'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'roadlayer'
          }}
        />
      </Fragment>
    )
  }
];
