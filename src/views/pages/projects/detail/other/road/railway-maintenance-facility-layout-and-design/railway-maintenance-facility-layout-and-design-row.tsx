// src/views/project/other/railway-maintenance-facility-layout-and-design/railway-maintenance-facility-layout-and-design-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceFacilityLayoutAndDesign } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './file-type-config';

interface CellType {
  row: RailwayMaintenanceFacilityLayoutAndDesign;
}

const entitySubject = 'railwaymaintenancefacilitylayoutanddesign';

export const railwayMaintenanceFacilityLayoutAndDesignColumns = (
  onDetail: (row: RailwayMaintenanceFacilityLayoutAndDesign) => void,
  onEdit: (row: RailwayMaintenanceFacilityLayoutAndDesign) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'RAILWAY_MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN';

  const booleanToText = (value: boolean | undefined) => (value === true ? t('common.yes') : value === false ? t('common.no') : t('common.na'));

  return [
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
      field: 'facility_name',
      headerName: t('project.other.railway-maintenance-facility-layout-and-design.details.facility-name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.facility_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'maintenance_bays_number_and_size',
      headerName: t('project.other.railway-maintenance-facility-layout-and-design.details.maintenance-bays-number-and-size'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.maintenance_bays_number_and_size || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 100,
      field: 'office_and_administrative_areas_availability',
      headerName: t('project.other.railway-maintenance-facility-layout-and-design.details.office-and-administrative-areas-availability'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {booleanToText(row?.office_and_administrative_areas_availability)}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={PRIMARY_FILE_TYPE} />}</>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}
        </Typography>
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
            model="RailwayMaintenanceFacilityLayoutAndDesign"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: entitySubject
            }}
            editPermissionRule={{
              action: 'update',
              subject: entitySubject
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
};