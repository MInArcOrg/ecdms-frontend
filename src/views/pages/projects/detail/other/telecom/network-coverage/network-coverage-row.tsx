import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { NetworkCoverage } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: NetworkCoverage;
}

export const networkCoverageColumns = (
  onDetail: (networkCoverage: NetworkCoverage) => void,
  onEdit: (networkCoverage: NetworkCoverage) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  telecomInfrastructureComponentMap: Map<string, string>
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'id',
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
          t('common.table-columns.details')
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.other.telecom-infrastructure.title'),
      field: 'telecom_infrastructure_id',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {telecomInfrastructureComponentMap.get(row.telecom_infrastructure_id) || t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.network-infrastructure-type'),
      field: 'network_infrastructure_type_id',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.networkinfrastructuretype?.id || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.total-coverage-area'),
      field: 'total_coverage_area',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.total_coverage_area?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.coverage-population-number'),
      field: 'coverage_population_number',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.coverage_population_number?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.active-users-number'),
      field: 'active_users_number',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.active_users_number?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.average-download-speed'),
      field: 'average_download_speed',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.average_download_speed?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.average-upload-speed'),
      field: 'average_upload_speed',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.average_upload_speed?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.signal-strength'),
      field: 'signal_strength',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.signal_strength?.toString() || t('common.not-available')}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.network-coverage.details.others'),
      field: 'others',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.others || t('common.not-available')}</Typography>
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
            model="NetworkCoverage"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
            deletePermissionRule={{
              action: 'delete',
              subject: 'networkcoverage'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'networkcoverage'
            }}
          />
        </Fragment>
      )
    }
  ];
