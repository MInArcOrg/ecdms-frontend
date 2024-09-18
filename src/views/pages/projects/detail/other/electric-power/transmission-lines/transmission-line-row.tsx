import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { TransmissionLine } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: TransmissionLine;
}

export const transmissionLineColumns = (
  onDetail: (transmissionLine: TransmissionLine) => void,
  onEdit: (transmissionLine: TransmissionLine) => void,
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
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.name'),
    field: 'name',
    renderCell: ({ row }: CellType) => (row.name ? row.name : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.line-type'),
    field: 'line_type',
    renderCell: ({ row }: CellType) => (row.line_type ? row.line_type : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.transmission-capacity'),
    field: 'transmission_capacity',
    renderCell: ({ row }: CellType) => (row.transmission_capacity ? row.transmission_capacity : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.transmitting-power'),
    field: 'transmitting_power',
    renderCell: ({ row }: CellType) => (row.transmitting_power ? row.transmitting_power : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.transmitting-current'),
    field: 'transmitting_current',
    renderCell: ({ row }: CellType) => (row.transmitting_current ? row.transmitting_current : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.transmitting-voltage'),
    field: 'transmitting_voltage',
    renderCell: ({ row }: CellType) => (row.transmitting_voltage ? row.transmitting_voltage : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.transmission-towers-number'),
    field: 'transmission_towers_number',
    renderCell: ({ row }: CellType) =>
      row.transmission_towers_number !== null ? row.transmission_towers_number : t('common.not-available')
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.start-northing'),
    field: 'start_northing',
    renderCell: ({ row }: CellType) => (row.start_northing !== null ? row.start_northing : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.start-easting'),
    field: 'start_easting',
    renderCell: ({ row }: CellType) => (row.start_easting !== null ? row.start_easting : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.end-northing'),
    field: 'end_northing',
    renderCell: ({ row }: CellType) => (row.end_northing !== null ? row.end_northing : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.transmission-line.details.end-easting'),
    field: 'end_easting',
    renderCell: ({ row }: CellType) => (row.end_easting !== null ? row.end_easting : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('common.table-columns.updated-at'),
    field: 'updated_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.updated_at ? formatCreatedAt(row.updated_at) : t('common.not-available')}
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
        <ModelAction model="TransmissionLine" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'transmissionline'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'transmissionline'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
];
