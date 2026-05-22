import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayVehicleIdentification } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayVehicleIdentification;
}

export const railwayVehicleIdentificationColumns = (
  onDetail: (row: RailwayVehicleIdentification) => void,
  onEdit: (row: RailwayVehicleIdentification) => void,
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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'vehicle_identification_number',
      headerName: t('project.other.railway-vehicle-identification.details.vehicle_identification_number'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.vehicle_identification_number || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'vehicle_type',
      headerName: t('project.other.railway-vehicle-identification.details.vehicle_type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.vehicle_type || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'manufacturer_supplier_name',
      headerName: t('project.other.railway-vehicle-identification.details.manufacturer_supplier_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.manufacturer_supplier_name || 'N/A'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 100,
      field: 'manufacture_year',
      headerName: t('project.other.railway-vehicle-identification.details.manufacture_year'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.manufacture_year || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'ownership_or_leasing_details',
      headerName: t('project.other.railway-vehicle-identification.details.ownership_or_leasing_details'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.ownership_or_leasing_details || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'remark',
      headerName: t('project.other.railway-vehicle-identification.details.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || ''} />}</>
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
            model="RailwayVehicleIdentification"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayvehicleidentification'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayvehicleidentification'
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
