import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { BuildingEnvelopMaterial } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: BuildingEnvelopMaterial;
}

export const buildingEnvelopMaterialColumns = (
  onDetail: (buildingEnvelopMaterial: BuildingEnvelopMaterial) => void,
  onEdit: (buildingEnvelopMaterial: BuildingEnvelopMaterial) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 120,
    field: 'id',
    headerName: 'ID',
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
        {row?.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.building-envelop-material.details.exterior-walls'),
    field: 'exterior_walls',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.exterior_walls || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.building-envelop-material.details.roof-assembly'),
    field: 'roof_assembly',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.roof_assembly || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.building-envelop-material.details.exterior-windows'),
    field: 'exterior_windows',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.exterior_windows || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.building-envelop-material.details.exterior-doors'),
    field: 'exterior_doors',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.exterior_doors || t('common.not-available')}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    headerName: t('project.other.building-envelop-material.details.shading-components'),
    field: 'shading_components',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.shading_components || t('common.not-available')}</Typography>
    )
  },

  {
    flex: 0.2,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.created_at ? formatCreatedAt(row.created_at) : t('common.not-available')}
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
          model="BuildingEnvelopMaterial"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions onEdit={() => onEdit(row)} onDelete={() => onDelete(row.id)} item={row} options={[]} />
      </Fragment>
    )
  }
];
