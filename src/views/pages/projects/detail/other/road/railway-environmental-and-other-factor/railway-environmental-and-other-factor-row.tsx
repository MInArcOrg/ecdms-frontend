import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import type { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayEnvironmentalAndOtherFactor } from 'src/types/project/other';
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: RailwayEnvironmentalAndOtherFactor;
}

export const railwayEnvironmentalAndOtherFactorColumns = (
  onDetail: (row: RailwayEnvironmentalAndOtherFactor) => void,
  onEdit: (row: RailwayEnvironmentalAndOtherFactor) => void,
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
          {t('common.table-columns.details') || 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'railway_line_section_name',
      headerName: t('project.other.railway-environmental-and-other-factor.details.railway_line_section_name'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_compliance_measures',
      headerName: t('project.other.railway-environmental-and-other-factor.details.environmental_compliance_measures'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.environmental_compliance_measures ? 'Yes' : 'No'}</Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 200,
      field: 'environmental_impact_assessment',
      headerName: t('project.other.railway-environmental-and-other-factor.details.environmental_impact_assessment'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.environmental_impact_assessment ? 'Yes' : 'No'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'data_recording_date',
      headerName: t('project.other.railway-environmental-and-other-factor.details.data_recording_date'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>
          {row?.data_recording_date ? formatDate(row.data_recording_date, 'yyyy-MM-dd') : 'N/A'}
        </Typography>
      )
    },
    {
      flex: 0.2,
      minWidth: 150,
      field: 'remark',
      headerName: t('project.other.railway-environmental-and-other-factor.details.remark'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
    },
    {
      flex: 0.1,
      minWidth: 120,
      field: 'files',
      headerName: t('common.table-columns.files'),
      sortable: false,
      filterable: false,
      renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || ''} />}</>
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.created_at ? formatCreatedAt(row.created_at) : 'N/A'}</Typography>
      )
    },
    {
      flex: 0.15,
      minWidth: 150,
      field: 'updated_at',
      headerName: t('common.table-columns.updated-at'),
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{row?.updated_at ? formatCreatedAt(row.updated_at) : 'N/A'}</Typography>
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
            model="RailwayEnvironmentalAndOtherFactor"
            model_id={row.id as string}
            refetchModel={refetch}
            resubmit={() => refetch()}
            title=""
            postAction={() => refetch()}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'railwayenvironmentalandotherfactor'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'railwayenvironmentalandotherfactor'
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
