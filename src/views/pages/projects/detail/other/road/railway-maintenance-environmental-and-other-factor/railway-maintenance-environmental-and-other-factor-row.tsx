// src/views/project/other/railway-maintenance-environmental-and-other-factor/railway-maintenance-environmental-and-other-factor-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayMaintenanceEnvironmentalAndOtherFactor } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './file-type-config';

interface CellType {
  row: RailwayMaintenanceEnvironmentalAndOtherFactor;
}

const entitySubject = 'railwaymaintenanceenvironmental-and-other-factor';

export const railwayMaintenanceEnvironmentalAndOtherFactorColumns = (
  onDetail: (row: RailwayMaintenanceEnvironmentalAndOtherFactor) => void,
  onEdit: (row: RailwayMaintenanceEnvironmentalAndOtherFactor) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = fileTypesConfig?.[0]?.type || 'RAILWAY_MAINTENANCE_ENVIRONMENTAL_AND_OTHER_FACTOR';


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
      headerName: t('project.other.railway-maintenance-environmental-and-other-factor.details.facility-name'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.facility_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'environmental_compliance_measures',
      headerName: t('project.other.railway-maintenance-environmental-and-other-factor.details.environmental-compliance-measures'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.environmental_compliance_measures || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'noise_reduction_measures',
      headerName: t('project.other.railway-maintenance-environmental-and-other-factor.details.noise-reduction-measures'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.noise_reduction_measures || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'sustainable_design_features',
      headerName: t('project.other.railway-maintenance-environmental-and-other-factor.details.sustainable-design-features'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.sustainable_design_features || 'N/A'}
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
            model="RailwayMaintenanceEnvironmentalAndOtherFactor"
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