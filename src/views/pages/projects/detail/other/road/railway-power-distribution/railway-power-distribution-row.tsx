// src/views/project/other/railway-power-distribution/railway-power-distribution-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerDistribution } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import type { FileTypeConfig, RAILWAY_POWER_DISTRIBUTION_ENTITY_SUBJECT } from './filet-type-config';

interface CellType {
  row: RailwayPowerDistribution;
}

const entitySubject = 'railwaypowerdistribution';

export const railwayPowerDistributionColumns = (
  onDetail: (row: RailwayPowerDistribution) => void,
  onEdit: (row: RailwayPowerDistribution) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[] // Dynamic file types array
): GridColDef[] => {
  // Use the primary file type from the config for the generic file drawer column
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'RAILWAY_POWER_DISTRIBUTION';

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
      flex: 0.25,
      minWidth: 200,
      field: 'railway_station_platform_layout_id',
      headerName: t('project.other.railway-power-distribution.details.railway_station_platform_layout_id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railwayStationPlatformLayout?.name || row?.railway_station_platform_layout_id?.slice(0, 8) + '...' || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-power-distribution.details.remark'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap' }}>{row.remark || 'N/A'}</Typography>
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
            model="RailwayPowerDistribution"
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