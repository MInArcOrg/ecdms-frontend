import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemEnvironmentalFactor } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayFasteningSystemEnvironmentalFactor;
}

export const railwayFasteningSystemEnvironmentalFactorColumns = (
  onDetail: (row: RailwayFasteningSystemEnvironmentalFactor) => void,
  onEdit: (row: RailwayFasteningSystemEnvironmentalFactor) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  otherSubMenu?: DetailSubMenuItemChild
): GridColDef[] => [
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
      field: 'railway_line_section_name',
      headerName: t(
        'project.other.railway-fastening-system-environmental-factor.details.railway_line_section_name'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.railway_line_section_name || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_compliance_measures',
      headerName: t(
        'project.other.railway-fastening-system-environmental-factor.details.environmental_compliance_measures'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.environmental_compliance_measures || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_impact_assessment',
      headerName: t(
        'project.other.railway-fastening-system-environmental-factor.details.environmental_impact_assessment'
      ),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.environmental_impact_assessment || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'remark',
      headerName: t('project.other.railway-fastening-system-environmental-factor.details.remark'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'fastening_system_condition_documentation',
      headerName: t('project.other.railway-fastening-system-environmental-factor.details.fastening_system_condition_documentation'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer id={row.id} type={'FASTENING_SYSTEM_CONDITION_DOCUMENTATION'} />
          )}
        </>
      )
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'default_files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => (
        <>
          {row.id && (
            <FileDrawer id={row.id} type={otherSubMenu?.fileType || ""} />
          )}
        </>
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
            model="RailwayFasteningSystemEnvironmentalFactor"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayfasteningsystemenvironmentalFactor'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayfasteningsystemenvironmentalFactor'
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