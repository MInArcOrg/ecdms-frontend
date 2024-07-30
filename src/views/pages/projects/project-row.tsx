import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Link from 'next/link';
import { Fragment } from 'react';
import { Project } from 'src/types/project';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Project;
}

export const projectColumns = (
  onEdit: (project: Project) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  typeId: string
) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.columns.title'),
      field: 'title',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            noWrap
            component={Link}
            href={`/projects/${typeId}/details/${row.id}/general/detail`}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {row.name}
          </Typography>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.columns.elapsed-time'),
      field: 'elapsed-time',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.elapsed_time}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.columns.cpi'),
      field: 'cpi',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.cpi}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('project.columns.spi'),
      field: 'spi',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.spi}</Typography>;
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
      flex: 0.15,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="Project"
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
          <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} options={[]} />
        </Fragment>
      )
    }
  ] as GridColDef[];
