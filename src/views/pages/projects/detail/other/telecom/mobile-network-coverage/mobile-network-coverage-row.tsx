import { Icon } from '@iconify/react';
import { Button, Tooltip, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import ModelAction from 'src/views/components/custom/model-actions';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import { MobileNetworkCoverage } from 'src/types/project/other';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: MobileNetworkCoverage;
}

export const mobileNetworkCoverageColumns = (
  onDetail: (mobileNetworkCoverage: MobileNetworkCoverage) => void,
  onEdit: (mobileNetworkCoverage: MobileNetworkCoverage) => void,
  onDelete: (id: string) => void,
  t: (key: string) => string,
  refetch: () => void,
  networkTypeMap: Map<string, string>,
  mobileNetworkMap: Map<string, string>,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.mobile-network.title'),
    field: 'mobile_network_id',
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
        {mobileNetworkMap.get(row.mobile_network_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.network-coverage.details.network-infrastructure-type'),
    field: 'network_infrastructure_type_id',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {networkTypeMap.get(row.network_infrastructure_type_id) || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.network-coverage.details.total-coverage-area'),
    field: 'total_coverage_area',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.total_coverage_area?.toString() || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.network-coverage.details.coverage-population-number'),
    field: 'coverage_population_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.coverage_population_number?.toString() || t('common.not-available')}
      </Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 120,
    headerName: t('project.other.network-coverage.details.active-users-number'),
    field: 'active_users_number',
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {row.active_users_number?.toString() || t('common.not-available')}
      </Typography>
    )
  },
  {
     minWidth: 150,
     sortable: false,
     field: 'actions',
     headerName: t('common.table-columns.actions'),
     renderCell: ({ row }: CellType) => (
       <Fragment>
         <ModelAction
           model="NetworkCapacity"
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
             subject: otherSubMenu?.model ||'',
           }}
           editPermissionRule={{
             action: 'update',
             subject: otherSubMenu?.model ||'',
           }}
         />
       </Fragment>
     )
   }
];
