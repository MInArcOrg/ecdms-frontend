import { GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import Role from 'src/types/admin/role';
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Role;
}

export const roleColumns = (onEdit: (role: Role) => void, onDelete: (id: string) => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'Role',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>;
      }
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Created At',
      field: 'created_at',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{moment(row.created_at).format('DD MMM YYYY')}</Typography>;
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions onEdit={onEdit} onDelete={() => onDelete(row.id)} item={row} />
    }
  ] as GridColDef[];
