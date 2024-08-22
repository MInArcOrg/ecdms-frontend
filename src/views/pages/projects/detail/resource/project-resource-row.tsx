import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { ProjectResource } from 'src/types/project/project-resource';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: ProjectResource;
}

export const projectResourceColumns = (
  onDetail: (projectResource: ProjectResource) => void,
  onEdit: (projectResource: ProjectResource) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) => {
  return [
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('resource.columns.title'),
      field: 'title',
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
            {row?.resource?.title}
          </Typography>
        );
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('resource.columns.measurement-unit'),
      field: 'measurement_unit',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.resource?.measurement_unit ?? t('N/A')}</Typography>;
      }
    },
    {
      flex: 0.2,
      minWidth: 150,
      headerName: t('resource.columns.description'),
      field: 'description',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.resource?.description ?? t('N/A')}</Typography>;
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
          <ModelAction
            model="ProjectResource"
            model_id={row.id || ''}
            refetchModel={refetch}
            resubmit={() => {}}
            title=""
            postAction={() => {}}
          />
          <RowOptions
            deletePermissionRule={{
              action: 'delete',
              subject: 'projectresource'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'projectresource'
            }}
            onDelete={() => onDelete(row.id || '')}
            item={row}
            options={[]}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
};
