import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { RailwaySleeperFasteningSystem } from 'src/types/project/other';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySleeperFasteningSystem;
}

export const railwaySleeperFasteningSystemColumns = (
  onDetail: (row: RailwaySleeperFasteningSystem) => void,
  onEdit: (row: RailwaySleeperFasteningSystem) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
    {
      flex: 0.15,
      minWidth: 120,
      field: 'project_id',
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
          {row?.project_id || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-sleeper-fastening-system.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'used_fastening_systems_type',
      headerName: t('project.other.railway-sleeper-fastening-system.details.used_fastening_systems_type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.used_fastening_systems_type || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'fastener_condition_assessment',
      headerName: t('project.other.railway-sleeper-fastening-system.details.fastener_condition_assessment'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.fastener_condition_assessment || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-sleeper-fastening-system.details.remark'),
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
            model="RailwaySleeperFasteningSystem"
            model_id={row.project_id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysleeperfasteningsystem' }}
            editPermissionRule={{ action: 'update', subject: 'railwaysleeperfasteningsystem' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.project_id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];