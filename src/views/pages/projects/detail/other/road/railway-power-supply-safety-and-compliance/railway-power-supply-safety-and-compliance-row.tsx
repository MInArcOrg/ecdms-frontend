// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-row.tsx

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt } from 'src/utils/formatter/date';
import type { FileTypeConfig } from './file-type-config';

interface CellType {
  row: RailwayPowerSupplySafetyAndCompliance;
}

const entitySubject = 'railwaypowersupplysafetyandcompliance';

export const railwayPowerSupplySafetyAndComplianceColumns = (
  onDetail: (row: RailwayPowerSupplySafetyAndCompliance) => void,
  onEdit: (row: RailwayPowerSupplySafetyAndCompliance) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild,
  fileTypesConfig?: FileTypeConfig[]
): GridColDef[] => {
  const PRIMARY_FILE_TYPE = otherSubMenu?.fileType || fileTypesConfig?.find(f => f.key === 'mainDocument')?.type || 'RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE';

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
      field: 'railway_station_platform_layout_id',
      headerName: t('common.table-columns.platform-layout'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railwayStationPlatformLayout?.name || row?.railway_station_platform_layout_id?.slice(0, 8) + '...' || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'safety_measures_and_protocols',
      headerName: t('project.other.railway-power-supply-safety-and-compliance.details.safety-measures-and-protocols'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {booleanToText(row?.safety_measures_and_protocols)}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 120,
      field: 'compliance_with_electrical_safety_standards_and_regulations',
      headerName: t('project.other.railway-power-supply-safety-and-compliance.details.compliance-with-electrical-safety-standards-and-regulations'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {booleanToText(row?.compliance_with_electrical_safety_standards_and_regulations)}
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
      flex: 0.2,
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
            model="RailwayPowerSupplySafetyAndCompliance"
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