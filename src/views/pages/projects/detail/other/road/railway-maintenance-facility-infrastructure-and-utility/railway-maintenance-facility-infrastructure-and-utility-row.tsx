// src/views/project/other/railway-maintenance-facility-infrastructure-and-utility/railway-maintenance-facility-infrastructure-and-utility-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceFacilityInfrastructureAndUtility } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './file-type-config';

interface CellType {
  row: RailwayMaintenanceFacilityInfrastructureAndUtility;
}

const entitySubject = 'railwaymaintenancefacilityinfrastructureandutility';

export const railwayMaintenanceFacilityInfrastructureAndUtilityColumns = (
  onDetail: (row: RailwayMaintenanceFacilityInfrastructureAndUtility) => void,
  onEdit: (row: RailwayMaintenanceFacilityInfrastructureAndUtility) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'RAILWAY_MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITIES';

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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'facility_name',
      headerName: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.facility-name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.facility_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'rail_tracks_and_turnout_availability',
      headerName: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.rail-tracks-and-turnout-availability'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {booleanToText(row?.rail_tracks_and_turnout_availability)}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'fueling_and_refueling_facility_availability',
      headerName: t('project.other.railway-maintenance-facility-infrastructure-and-utilities.details.fueling-and-refueling-facility-availability'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {booleanToText(row?.fueling_and_refueling_facility_availability)}
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
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || PRIMARY_FILE_TYPE} />}</>
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
            model="RailwayMaintenanceFacilityInfrastructureAndUtility"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: otherSubMenu?.model || entitySubject
            }}
            editPermissionRule={{
              action: 'update',
              subject: otherSubMenu?.model || entitySubject
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