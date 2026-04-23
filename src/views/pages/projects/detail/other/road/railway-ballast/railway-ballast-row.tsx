import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwayBallast } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayBallast;
}

export const railwayBallastColumns = (
  onDetail: (row: RailwayBallast) => void,
  onEdit: (row: RailwayBallast) => void,
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
      flex: 0.2,
      minWidth: 180,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-ballast.details.railway-line-section-name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'railway_ballast_name',
      headerName: t('project.other.railway-ballast.details.railway-ballast-name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_ballast_name || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 140,
      field: 'ballast_id_no',
      headerName: t('project.other.railway-ballast.details.ballast-id-no'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.ballast_id_no || 'N/A'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 160,
      field: 'ballast_construction_cost',
      headerName: t('project.other.railway-ballast.details.ballast-construction-cost'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.ballast_construction_cost !== undefined && row?.ballast_construction_cost !== null
            ? row.ballast_construction_cost.toLocaleString(undefined, {
              minimumFractionDigits: 2
            })
            : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-ballast.details.remark'),
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
            model="RailwayBallast"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwayballast' }}
            editPermissionRule={{ action: 'update', subject: 'railwayballast' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];
