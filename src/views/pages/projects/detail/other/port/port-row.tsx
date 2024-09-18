import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { Port } from 'src/types/project/other';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Port;
}

export const portColumns = (
  onDetail: (port: Port) => void,
  onEdit: (port: Port) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.port.columns.title'),
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
            {row?.id.slice(0, 5)}...
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.port.columns.operator'),
      field: 'operator',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.operator}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.other.port.columns.port-type'),
      field: 'port_type',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.port_type}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.created_at)}</Typography>;
      }
    },

    {
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="Port"
            model_id={row.id}
            refetchModel={refetch}
            resubmit={function (): void {
              throw new Error('Function not implemented.');
            }}
            title={''}
            postAction={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(row.id)}
            deletePermissionRule={{
              action: 'delete',
              subject: 'port'
            }}
            editPermissionRule={{
              action: 'edit',
              subject: 'port'
            }}
            item={row}
            options={[]}
          />
        </Fragment>
      )
    }
  ] as GridColDef[];
