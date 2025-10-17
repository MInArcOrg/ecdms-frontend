import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayStationPlatformStructuralElement } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayStationPlatformStructuralElement;
}

export const railwayStationPlatformStructuralElementColumns = (
  onDetail: (row: RailwayStationPlatformStructuralElement) => void,
  onEdit: (row: RailwayStationPlatformStructuralElement) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
  {
    flex: 0.1,
    minWidth: 80,
    field: 'id',
    headerName: t('common.table-columns.id'),
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
        {row?.id?.toString().slice(0, 5) || 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'railway_station_platform_layout_id',
    headerName: t('project.other.railway-station-platform-structural-element.details.railway_station_platform_layout_id'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.railwayStationPlatformLayout ? row?.railwayStationPlatformLayout.name || row.railway_station_platform_layout_id : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'materials_used',
    headerName: t('project.other.railway-station-platform-structural-element.details.materials_used'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.materials_used || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'roofing_type_and_design',
    headerName: t('project.other.railway-station-platform-structural-element.details.roofing_type_and_design'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.roofing_type_and_design || 'N/A'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 120,
    field: 'lighting_fixtures',
    headerName: t('project.other.railway-station-platform-structural-element.details.lighting_fixtures'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.lighting_fixtures ? t('common.yes') : t('common.no')}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 240,
    field: 'files',
    headerName: t('common.table-columns.files'),
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        {row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || 'RAILWAY_STATION_PLATFORM_STRUCTURAL_ELEMENT'} />}
        {row.id && <FileDrawer id={row.id} type={'CANOPY_OR_SHELTER_DETAIL'} />}
      </>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'created_at',
    headerName: t('common.table-columns.created-at'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}</Typography>
    )
  },
  {
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    minWidth: 250,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        <ModelAction
          model="RailwayStationPlatformStructuralElement"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaystationplatformstructuralelement'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaystationplatformstructuralelement'
          }}
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id as string)}
          item={row}
          options={[]}
        />
      </>
    )
  }
];
