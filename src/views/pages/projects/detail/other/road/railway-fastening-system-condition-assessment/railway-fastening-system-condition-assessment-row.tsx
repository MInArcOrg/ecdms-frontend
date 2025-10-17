import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayFasteningSystemConditionAssessment } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatDynamicDate } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayFasteningSystemConditionAssessment;
}

export const railwayFasteningSystemConditionAssessmentColumns = (
  onDetail: (row: RailwayFasteningSystemConditionAssessment) => void,
  onEdit: (row: RailwayFasteningSystemConditionAssessment) => void,
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
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.railway_line_section_name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'inspection_date',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.inspection_date'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row.inspection_date ? formatDynamicDate(row.inspection_date) : 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'fastening_system_condition_rating',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.fastening_system_condition_rating'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.fastening_system_condition_rating || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'defect_presence',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.defect_presence'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.defect_presence || 'N/A'}</Typography>
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'fastening_system_stability_and_alignment',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.fastening_system_stability_and_alignment'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.fastening_system_stability_and_alignment || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'rail_fastening_model_number',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_model_number'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.rail_fastening_model_number || 'N/A'}</Typography>
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'rail_fastening_needed_quantity',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_needed_quantity'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.rail_fastening_needed_quantity?.toString() || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'rail_fastening_expected_lifespan',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_expected_lifespan'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.rail_fastening_expected_lifespan?.toString() || 'N/A'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'rail_fastening_availability',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.rail_fastening_availability'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>
        {typeof row.rail_fastening_availability === 'boolean'
          ? row.rail_fastening_availability
            ? t('common.options.yes')
            : t('common.options.no')
          : 'N/A'}
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-fastening-system-condition-assessment.details.remark'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
  },
  {
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    minWidth: 250,
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => (
      <>
        {row.id && otherSubMenu?.fileType && <FileDrawer id={row.id} type={otherSubMenu.fileType} />}
        <ModelAction
          model="RailwayFasteningSystemConditionAssessment"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwayfasteningsystemconditionassessment'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwayfasteningsystemconditionassessment'
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
