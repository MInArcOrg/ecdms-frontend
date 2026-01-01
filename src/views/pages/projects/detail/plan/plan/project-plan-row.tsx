import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { uploadableProjectFileTypes } from 'src/services/utils/file-constants';
import { ProjectPlan } from 'src/types/project/project-plan';
import { formatCurrency } from 'src/utils/formatter/currency';
import { formatDate } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectPlan;
}

export const projectPlanColumns = (
  onDetail: (projectPlan: ProjectPlan) => void,
  onEdit: (projectPlan: ProjectPlan) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) => {
  return [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.report.columns.type'),
      field: 'type',
      renderCell: ({ row }: CellType) => {
        return (
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
            {`Q${row.quarter}/${formatDate(row.start, 'yyyy')}`}
          </Typography>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.report.columns.financial-performance'),
      field: 'year',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(Number(row.financial_performance)) ?? t('N/A')}</Typography>;
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.report.columns.physical-performance'),
      field: 'quarter',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(Number(row.physical_performance)) ?? t('N/A')}</Typography>;
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('project.report.columns.project-expense'),
      field: 'project_expense',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCurrency(Number(row.project_expense)) ?? t('N/A')}</Typography>;
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('common.table-columns.files'),
      field: 'file_id',
      renderCell: ({ row }: CellType) => {
        return <FileDrawer id={row.id} type={uploadableProjectFileTypes.plan} />
      }
    },

    {
      flex: 0.2,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction model="ProjectPlan" model_id={row.id} refetchModel={refetch} resubmit={() => { }} title="" postAction={() => { }} />
          <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row}
            deletePermissionRule={{
              action: 'delete',
              subject: 'projectplan'
            }}
            editPermissionRule={{
              action: 'update',
              subject: 'projectplan'
            }}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
};
