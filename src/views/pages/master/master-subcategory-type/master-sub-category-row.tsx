import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import { MasterSubCategory } from 'src/types/master/master-types';
import { formatCreatedAt } from 'src/utils/formatter/date';
import ModelAction from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: MasterSubCategory;
}

export const masterSubCategoryRowColumns = (
  onEdit: (category: MasterSubCategory) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void
) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('master-data.master-category.columns.title'),
      field: 'title',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.title}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('master-data.master-category.columns.description'),
      field: 'Description',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.title}</Typography>;
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
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.status'),
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelAction
            model="Position"
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
