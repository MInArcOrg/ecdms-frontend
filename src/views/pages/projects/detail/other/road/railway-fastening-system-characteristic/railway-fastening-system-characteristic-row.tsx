import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemCharacteristic } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayFasteningSystemCharacteristic;
}

export const railwayFasteningSystemCharacteristicColumns = (
  onDetail: (row: RailwayFasteningSystemCharacteristic) => void,
  onEdit: (row: RailwayFasteningSystemCharacteristic) => void,
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
    field: 'railway_line_section_name',
    headerName: t('project.other.railway-fastening-system-characteristic.details.railway_line_section_name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'used_fastening_system_type',
    headerName: t('project.other.railway-fastening-system-characteristic.details.used_fastening_system_type'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.used_fastening_system_type || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'fastening_system_manufacturer_supplier',
    headerName: t('project.other.railway-fastening-system-characteristic.details.fastening_system_manufacturer_supplier'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.fastening_system_manufacturer_supplier || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'fastening_system_specifications',
    headerName: t('project.other.railway-fastening-system-characteristic.details.fastening_system_specifications'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.fastening_system_specifications || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'rail_clips_or_clamps_details',
    headerName: t('project.other.railway-fastening-system-characteristic.details.rail_clips_or_clamps_details'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.rail_clips_or_clamps_details || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'bolts_and_nuts_specifications',
    headerName: t('project.other.railway-fastening-system-characteristic.details.bolts_and_nuts_specifications'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.bolts_and_nuts_specifications || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'other_fastening_system',
    headerName: t('project.other.railway-fastening-system-characteristic.details.other_fastening_system'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.other_fastening_system || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-fastening-system-characteristic.details.remark'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
  },
  {
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    minWidth: 250,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        {/* Add FileDrawer if the ID and fileType are available */}
        {row.id && otherSubMenu?.fileType && <FileDrawer id={row.id} type={otherSubMenu.fileType} />}
        <ModelAction
          model="RailwayFasteningSystemCharacteristic"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayfasteningsystemcharacteristic'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayfasteningsystemcharacteristic'
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
