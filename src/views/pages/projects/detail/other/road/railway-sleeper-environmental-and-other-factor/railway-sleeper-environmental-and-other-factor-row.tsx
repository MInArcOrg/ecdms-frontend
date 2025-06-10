import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwaySleeperEnvironmentalAndOtherFactor } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwaySleeperEnvironmentalAndOtherFactor;
}

export const railwaySleeperEnvironmentalAndOtherFactorColumns = (
  onDetail: (row: RailwaySleeperEnvironmentalAndOtherFactor) => void,
  onEdit: (row: RailwaySleeperEnvironmentalAndOtherFactor) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild
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
      headerName: t('project.other.railway-sleeper-environmental-and-other-factor.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'environmental_compliance_measures',
      headerName: t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_compliance_measures'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.environmental_compliance_measures || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 180,
      field: 'environmental_impact_assessment',
      headerName: t('project.other.railway-sleeper-environmental-and-other-factor.details.environmental_impact_assessment'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.environmental_impact_assessment || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-sleeper-environmental-and-other-factor.details.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'SLEEPER_CONDITION_PHOTO',
      headerName: t('project.other.railway-sleeper-environmental-and-other-factor.details.sleeper_condition_photo'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>
        <FileDrawer id={row?.id || ''} type={'SLEEPER_CONDITION_PHOTO' || ''} />
      </Typography>
    },

    {
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      minWidth: 250,
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          <FileDrawer id={row?.id || ''} type={otherSubMenu?.fileType || ''} />
          <ModelAction
            model="RailwaySleeperEnvironmentalAndOtherFactor"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{ action: 'delete', subject: 'railwaysleeperenvironmentalandotherfactor' }}
            editPermissionRule={{ action: 'update', subject: 'railwaysleeperenvironmentalandotherfactor' }}
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            options={[]}
          />
        </>
      )
    }
  ];