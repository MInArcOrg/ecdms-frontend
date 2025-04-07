'use client';

import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import type { ElectricSmartMetersPrivacyAndSecurityData } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ElectricSmartMetersPrivacyAndSecurityData;
}

export const electricSmartMetersPrivacyAndSecurityDataColumns = (
  onDetail: (electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData) => void,
  onEdit: (electricSmartMetersPrivacyAndSecurityData: ElectricSmartMetersPrivacyAndSecurityData) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  electricSmartMetersDataMap: Map<string, string>,
  privacyMeasuresTypesMap: Map<string, string>,
  customerEngagementFrequenciesMap: Map<string, string>,
  customerEngagementProgramTypesMap: Map<string, string>
): GridColDef[] => [
  {
    flex: 0.2,
    minWidth: 150,
    field: 'name',
    headerName: t('project.other.electric-smart-meters-privacy-and-security-data.details.name'),
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
        {row?.name || row?.id.slice(0, 8) + '...'}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.electric-smart-meters-privacy-and-security-data.details.electric-smart-meters-data-id'),
    field: 'electric_smart_meters_data_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.electric_smart_meters_data_id
          ? electricSmartMetersDataMap.get(row.electric_smart_meters_data_id) || row.electric_smart_meters_data_id
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.electric-smart-meters-privacy-and-security-data.details.privacy-measures-type-id'),
    field: 'privacy_measures_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.privacy_measures_type_id
          ? privacyMeasuresTypesMap.get(row.privacy_measures_type_id) || row.privacy_measures_type_id
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.electric-smart-meters-privacy-and-security-data.details.customer-engagement-frequency-id'),
    field: 'customer_engagement_frequency_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row?.customer_engagement_frequency_id
          ? customerEngagementFrequenciesMap.get(row.customer_engagement_frequency_id) || row.customer_engagement_frequency_id
          : t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('common.table-columns.created-at'),
    field: 'created_at',
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="ElectricSmartMetersPrivacyAndSecurityData"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          deletePermissionRule={{
            action: 'delete',
            subject: 'electricsmartmetersprivacyandsecuritydata'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'electricsmartmetersprivacyandsecuritydata'
          }}
        />
      </Fragment>
    )
  }
];
