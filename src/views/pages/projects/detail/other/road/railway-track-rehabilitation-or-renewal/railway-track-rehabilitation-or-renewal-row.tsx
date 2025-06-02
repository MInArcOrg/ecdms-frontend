import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { RailwayTrackRehabilitationOrRenewal } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayTrackRehabilitationOrRenewal;
}

export const railwayTrackRehabilitationOrRenewalColumns = (
  onDetail: (row: RailwayTrackRehabilitationOrRenewal) => void,
  onEdit: (row: RailwayTrackRehabilitationOrRenewal) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
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
          {row?.id.slice(0, 5)}...
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.railway-track-rehabilitation-or-renewal.details.track-renewal-history'),
      field: 'track_renewal_history',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.track_renewal_history || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.railway-track-rehabilitation-or-renewal.details.plans-or-schedules'),
      field: 'plans_or_schedules',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.plans_or_schedules || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-methods-used-id'),
      field: 'rehabilitation_renewal_methods_used_id',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.rehabilitation_renewal_methods_used_id || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.railway-track-rehabilitation-or-renewal.details.rehabilitation-renewal-types'),
      field: 'rehabilitation_renewal_types',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.rehabilitation_renewal_types || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.railway-track-rehabilitation-or-renewal.details.remark'),
      field: 'remark',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || t('common.not-available')}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row?.created_at) || t('common.not-available')}</Typography>
    },

    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 180,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <ModelAction
            model="RailwayTrackRehabilitationOrRenewal"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaytrackrehabilitationorrenewal' }}
            editPermissionRule={{ action: 'update', subject: 'railwaytrackrehabilitationorrenewal' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];