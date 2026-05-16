import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySignalingSystem } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySignalingSystem;
}

export const railwaySignalingSystemColumns = (
  onDetail: (row: RailwaySignalingSystem) => void,
  onEdit: (row: RailwaySignalingSystem) => void,
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
      headerName: t('project.other.railway-signaling-system.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'signalingSystemType.title',
      headerName: t('project.other.railway-signaling-system.details.signaling_system_type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.signalingSystemType?.title || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'signaling_system_manufacturer_or_supplier_name',
      headerName: t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.signaling_system_manufacturer_or_supplier_name || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'signaling_system_manufacturer_or_supplier_phone',
      headerName: t('project.other.railway-signaling-system.details.signaling_system_manufacturer_or_supplier_phone'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.signaling_system_manufacturer_or_supplier_phone || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'signaling_system_components',
      headerName: t('project.other.railway-signaling-system.details.signaling_system_components'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.signaling_system_components || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-signaling-system.details.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'default_files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.id || ''} />}</>
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
            model="RailwaySignalingSystem"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwaysignalingsystem'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaysignalingsystem'
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
