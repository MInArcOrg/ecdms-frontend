// src/views/project/other/railway-power-supply-safety-and-compliance/railway-power-supply-safety-and-compliance-row.tsx

import React from 'react';
import { Box, Tooltip, IconButton, Typography, Button } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import type { TFunction } from 'i18next';

// Type Imports
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { RailwayPowerSupplySafetyAndCompliance } from 'src/types/project/other';
import CustomChip from 'src/views/components/custom/custom-chip';
import { useTranslation } from 'react-i18next';
import { FileTypeConfig } from './file-type-config';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import FileDrawer from 'src/views/components/custom/files-drawer';

// Define the type for the cell data (the row)
type CellType = { row: RailwayPowerSupplySafetyAndCompliance };

// --- Chip Renderer Component ---
interface ChipCellProps {
  row: RailwayPowerSupplySafetyAndCompliance;
  attribute: keyof RailwayPowerSupplySafetyAndCompliance;
}

const ChipRenderer: React.FC<ChipCellProps> = ({ row, attribute }) => {
  const { t } = useTranslation(); // Assuming useTranslation is imported here

  const value = row[attribute] as boolean | null;
  const isPresent = value === true;

  return (
    <CustomChip
      skin='light'
      color={isPresent ? 'success' : 'warning'}
      label={isPresent ? t('common.yes') : t('common.no')}
      sx={{ '& .MuiChip-label': { lineHeight: '18px' } }}
    />
  );
};
const entitySubject = 'railwaypowersupplysafetyandcompliance';
export const railwayPowerSupplySafetyAndComplianceColumns = (
  onDetail: (data: RailwayPowerSupplySafetyAndCompliance) => void,
  onEdit: (data: RailwayPowerSupplySafetyAndCompliance) => void,
  onDelete: (id: string) => void,
  t: TFunction,
  refetch: () => void,
  otherSubMenu: DetailSubMenuItemChild | undefined,
  fileTypesConfig: FileTypeConfig[] // Unused here, but part of the standard signature
): GridColDef[] => {
  return [
    {
      flex: 0.25,
      minWidth: 150,
      field: 'platform_layout',
      headerName: t('common.table-columns.platform-layout'),
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
          {row.railwayStationPlatformLayout?.name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'safety_measures_and_protocols',
      headerName: t('project.other.railway-power-supply-safety-and-compliance.details.has-safety-measures'),
      renderCell: ({ row }: CellType) => (
        <ChipRenderer row={row} attribute='safety_measures_and_protocols' />
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'compliance_with_electrical_safety_standards_and_regulations',
      headerName: t('project.other.railway-power-supply-safety-and-compliance.details.is-compliant'),
      renderCell: ({ row }: CellType) => (
        <ChipRenderer row={row} attribute='compliance_with_electrical_safety_standards_and_regulations' />
      )
    },
    {
      flex: 0.25,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-power-supply-safety-and-compliance.details.remark'),
      renderCell: ({ row }: CellType) => (
        <span>{row.remark || '-'}</span>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || fileTypesConfig[0].type} />}</>
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
            model="RailwayPowerSupplyMaintenanceAndTesting"
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