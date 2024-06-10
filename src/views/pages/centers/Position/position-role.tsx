import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Position from 'src/types/department/position';
import { formatCreatedAt } from 'src/utils/formatter/date';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Position;
}

export const userColumns = (onEdit: (user: Position) => void, onDelete: (id: string) => void, t: any) =>
  [
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.name'),
      field: 'name',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.name}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('common.table-columns.created-at'),
      field: 'createdAt',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{formatCreatedAt(row.createdAt)}</Typography>;
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.status'),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[
            {
              icon: 'fds',
              name: 'Assign',
              onClick: () => {
                console.log('assign clicked');
              }
            }
          ]}
        />
      )
    }
  ] as GridColDef[];
