import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { RoadSegment } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RoadSegment;
}

export const roadSegmentColumns = (
  onDetail: (roadSegment: RoadSegment) => void,
  onEdit: (roadSegment: RoadSegment) => void,
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
    headerName: t('project.other.road-segment.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => (row.name ? row.name : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.specifications'),
    field: 'specifications',
    renderCell: ({ row }: CellType) => (row.specifications ? row.specifications : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.no-of-layers'),
    field: 'no_of_layers',
    renderCell: ({ row }: CellType) => (row.no_of_layers !== undefined ? row.no_of_layers : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.length'),
    field: 'length',
    renderCell: ({ row }: CellType) => (row.length !== undefined ? `${row.length} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.width'),
    field: 'width',
    renderCell: ({ row }: CellType) => (row.width !== undefined ? `${row.width} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.remark'),
    field: 'remark',
    renderCell: ({ row }: CellType) => (row.remark ? row.remark : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.start-northing'),
    field: 'start_northing',
    renderCell: ({ row }: CellType) => (row.start_northing !== undefined ? `${row.start_northing} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.start-easting'),
    field: 'start_easting',
    renderCell: ({ row }: CellType) => (row.start_easting !== undefined ? `${row.start_easting} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.end-northing'),
    field: 'end_northing',
    renderCell: ({ row }: CellType) => (row.end_northing !== undefined ? `${row.end_northing} m` : t('common.not-available'))
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.road-segment.details.end-easting'),
    field: 'end_easting',
    renderCell: ({ row }: CellType) => (row.end_easting !== undefined ? `${row.end_easting} m` : t('common.not-available'))
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
        <ModelAction model="RoadSegment" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'roadsegment'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'roadsegment'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
