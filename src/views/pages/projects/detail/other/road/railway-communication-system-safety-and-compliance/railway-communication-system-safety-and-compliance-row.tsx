import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import type { GridColDef } from '@mui/x-data-grid';
import { DetailSubMenuItemChild } from 'src/types/layouts/detail-layout';
import type { RailwayCommunicationSystemSafetyAndCompliance } from 'src/types/project/other';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import { formatCreatedAt, formatDate } from 'src/utils/formatter/date';

interface CellType {
  row: RailwayCommunicationSystemSafetyAndCompliance;
}

export const railwayCommunicationSystemSafetyAndComplianceColumns = (
  onDetail: (row: RailwayCommunicationSystemSafetyAndCompliance) => void,
  onEdit: (row: RailwayCommunicationSystemSafetyAndCompliance) => void,
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
    headerName: t('project.other.railway-communication-system-safety-and-compliance.details.railway_line_section_name'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.railway_line_section_name || 'N/A'}</Typography>
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'safety_measures_and_protocols_done',
    headerName: t('project.other.railway-communication-system-safety-and-compliance.details.safety_measures_and_protocols_done'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.safety_measures_and_protocols_done ? 'Yes' : 'No'}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'compliance_with_signaling_and_communication_standards',
    headerName: t(
      'project.other.railway-communication-system-safety-and-compliance.details.compliance_with_signaling_and_communication_standards'
    ),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.compliance_with_signaling_and_communication_standards ? 'Yes' : 'No'}</Typography>
    )
  },
  {
    flex: 0.1,
    minWidth: 100,
    field: 'incident_or_accident_records',
    headerName: t('project.other.railway-communication-system-safety-and-compliance.details.incident_or_accident_records'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.incident_or_accident_records ? 'Yes' : 'No'}</Typography>
    )
  },
  {
    flex: 0.15,
    minWidth: 150,
    field: 'incident_date',
    headerName: t('project.other.railway-communication-system-safety-and-compliance.details.incident_date'),
    renderCell: ({ row }: CellType) => (
      <Typography sx={{ color: 'text.secondary' }}>{row?.incident_date ? formatDate(row.incident_date) : 'N/A'}</Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 200,
    field: 'remark',
    headerName: t('project.other.railway-communication-system-safety-and-compliance.details.remark'),
    renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row?.remark || 'N/A'}</Typography>
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
    flex: 0.1,
    minWidth: 120,
    field: 'files',
    headerName: t('common.table-columns.files'),
    sortable: false,
    filterable: false,
    renderCell: ({ row }: CellType) => <>{row.id && <FileDrawer id={row.id} type={otherSubMenu?.fileType || ''} />}</>
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
          model="RailwayCommunicationSystemSafetyAndCompliance"
          model_id={row.id as string}
          refetchModel={refetch}
          resubmit={() => refetch()}
          title=""
          postAction={() => refetch()}
        />
        <RowOptions
          deletePermissionRule={{
            action: 'delete',
            subject: 'railwaycommunicationsystemsafetyandcompliance'
          }}
          editPermissionRule={{
            action: 'update',
            subject: 'railwaycommunicationsystemsafetyandcompliance'
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
