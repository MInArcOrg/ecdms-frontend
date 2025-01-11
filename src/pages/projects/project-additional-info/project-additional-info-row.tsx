import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ProjectAdditionalInfo } from 'src/types/project/project-additional-info-and-outcome';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';


interface CellType {
  row: ProjectAdditionalInfo;
}

export const additionalInfoColumns = (
  onDetail: (additionalInfo: ProjectAdditionalInfo) => void,
  onEdit: (additionalInfo: ProjectAdditionalInfo) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
): GridColDef[] => [
  {
    flex: 0.15,
    minWidth: 120,
    field: 'id',
    headerName: t('common.id'),
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
        {row.id.slice(0, 5)}...
      </Typography>
    )
  },
  {
    flex: 0.2,
    minWidth: 150,
    field: 'project_status',
    headerName: t('project.additional-info.status'),
    renderCell: ({ row }: CellType) => row.project_status || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'work_accident_number',
    headerName: t('project.additional-info.accidents'),
    renderCell: ({ row }: CellType) => row.work_accident_number || t('common.not-available')
  },
  {
    flex: 0.25,
    minWidth: 200,
    field: 'reason',
    headerName: t('project.additional-info.reason'),
    renderCell: ({ row }: CellType) => row.reason || t('common.not-available')
  },
  {
    flex: 0.15,
    minWidth: 120,
    field: 'created_at',
    headerName: t('common.created-at'),
    renderCell: ({ row }: CellType) => formatCreatedAt(row.created_at)
  },
  {
    minWidth: 150,
    sortable: false,
    field: 'actions',
    headerName: t('common.table-columns.actions'),
    renderCell: ({ row }: CellType) => (
      <Fragment>
        <ModelAction
          model="ProjectAdditionalInfo"
          model_id={row.id}
          refetchModel={refetch}
          resubmit={() => {}}
          title=""
          postAction={() => {}}
        />
        <RowOptions
          onEdit={() => onEdit(row)}
          onDelete={() => onDelete(row.id)}
          item={row}
          deletePermissionRule={{
            action: 'delete',
            subject: 'additionalinfo'
          }}
          editPermissionRule={{
            action: 'edit',
            subject: 'additionalinfo'
          }}
          options={[]}
        />
      </Fragment>
    )
  }
]; 