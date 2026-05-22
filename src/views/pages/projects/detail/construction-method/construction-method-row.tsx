import { Button, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { uploadableResourceFileTypes } from 'src/services/utils/file-constants';
import type { ConstructionMethod } from 'src/types/project/construction-method';
import { formatCreatedAt } from 'src/utils/formatter/date';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ConstructionMethod;
}

export const constructionMethodColumns = (
  onDetail: (method: ConstructionMethod) => void,
  onEdit: (method: ConstructionMethod) => void,
  onDelete: (id: string) => void,
  t: any
): GridColDef[] => [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'project_method',
      headerName: t('project.construction-method.method'),
      renderCell: ({ row }: CellType) => (
        <Typography
          noWrap
          component={Button}
          onClick={() => onDetail(row)}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' },
            textTransform: 'none',
            justifyContent: 'flex-start',
            p: 0
          }}
        >
          {row.projectMethod?.title || row.project_method?.title || row.project_method_id}
        </Typography>
      )
    },
    {
      flex: 0.35,
      minWidth: 230,
      field: 'description',
      headerName: t('project.construction-method.description'),
      renderCell: ({ row }: CellType) => (
        <Typography variant="body2" sx={{ color: 'text.primary' }}>
          {row.description || t('common.not-available')}
        </Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      headerName: t('common.table-columns.files'),
      field: 'files',
      renderCell: ({ row }: CellType) => {
        return <FileDrawer id={row.id} type={uploadableResourceFileTypes.constructionMethod} />
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      field: 'created_at',
      headerName: t('common.table-columns.created-at'),
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
            model="ConstructionMethod"
            model_id={row?.id || ''}
            refetchModel={() => { }}
            resubmit={() => { }}
            title=""
            postAction={() => { }}
          />
          <RowOptions
            onEdit={() => onEdit(row)}
            onDelete={() => onDelete(row.id)}
            item={row}
            editPermissionRule={
              {
                action: 'update',
                subject: 'constructionmethod'
              }
            }
            deletePermissionRule={
              {
                action: 'delete',
                subject: 'constructionmethod'
              }
            }
            options={[]}
          />
        </Fragment>
      )
    }
  ];
