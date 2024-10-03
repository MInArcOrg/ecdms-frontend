import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ElectricTower } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ElectricTower;
}

export const electricTowerColumns = (
  onDetail: (electricTower: ElectricTower) => void,
  onEdit: (electricTower: ElectricTower) => void,
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
    headerName: t('project.other.electric-tower.details.transmissionline-id'),
    field: 'transmissionline_id',
    renderCell: ({ row }: CellType) => (row.transmissionline_id ? row.transmissionline_id : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.overall-length'),
    field: 'overall_length',
    renderCell: ({ row }: CellType) => (row.overall_length !== null ? row.overall_length?.toString() : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.embedded-length'),
    field: 'embedded_length',
    renderCell: ({ row }: CellType) => (row.embedded_length !== null ? row.embedded_length?.toString() : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.columns'),
    field: 'columns',
    renderCell: ({ row }: CellType) => (row.columns ? row.columns : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.braces'),
    field: 'braces',
    renderCell: ({ row }: CellType) => (row.braces ? row.braces : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.beam-cross-arms'),
    field: 'beam_cross_arms',
    renderCell: ({ row }: CellType) => (row.beam_cross_arms ? row.beam_cross_arms : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.brace-cross-arm'),
    field: 'brace_cross_arm',
    renderCell: ({ row }: CellType) => (row.brace_cross_arm ? row.brace_cross_arm : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.elasticity-modulus'),
    field: 'elasticity_modulus',
    renderCell: ({ row }: CellType) => (row.elasticity_modulus ? row.elasticity_modulus : t('common.not-available'))
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.electric-tower.details.poission-ratio'),
    field: 'poission_ratio',
    renderCell: ({ row }: CellType) => (row.poission_ratio ? row.poission_ratio : t('common.not-available'))
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
        <ModelAction model="ElectricTower" model_id={row.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
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
