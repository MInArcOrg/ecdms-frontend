import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { RailwayTrackSafety } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayTrackSafety;
}

export const railwayTrackSafetryColumns = (
  onDetail: (row: RailwayTrackSafety) => void,
  onEdit: (row: RailwayTrackSafety) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 120,
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
          {row?.id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'railway_track_safety_measures_id',
      headerName: t('project.other.railway-track-safety.details.railway-track-safety-measures-id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.railway_track_safety_measures_id || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'track_inspection_frequency_id',
      headerName: t('project.other.railway-track-safety.details.track-inspection-frequency-id'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.track_inspection_frequency_id || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'is_compliant_with_safety_regulations_standards',
      headerName: t('project.other.railway-track-safety.details.is-compliant-with-safety-regulations-standards'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.is_compliant_with_safety_regulations_standards !== null && row?.is_compliant_with_safety_regulations_standards !== undefined
            ? row.is_compliant_with_safety_regulations_standards
              ? t('common.boolean.yes')
              : t('common.boolean.no')

            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'remark',
      headerName: t('project.other.railway-track-safety.details.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
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
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwaytracksafety'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwaytracksafety'
            }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
