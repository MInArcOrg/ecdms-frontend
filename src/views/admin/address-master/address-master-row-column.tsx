import { GridColDef } from '@mui/x-data-grid';
import Typography from '@mui/material/Typography';
import moment from 'moment';
import RowOptions from 'src/views/shared/listing/row-options';
import { AddressMaster, AddressType, addressTypes } from 'src/types/admin/address';
import Link from 'next/link';

interface CellType {
  row: AddressMaster;
}

export const addressMasterColumns = (
  onEdit: (address: AddressMaster) => void,
  onDelete: (id: string) => void,
  transl: (word: string) => string
) =>
  [
    {
      flex: 0.25,
      minWidth: 200,
      field: 'title',
      headerName: transl('address-master.columns.title'),
      renderCell: ({ row }: CellType) => getTitleLinkOrText(row)
    },

    {
      flex: 0.15,
      minWidth: 120,
      field: 'type',
      headerName: transl('address-master.columns.type'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.type}</Typography>
    },
    {
      flex: 0.3,
      minWidth: 250,
      field: 'description',
      headerName: transl('address-master.columns.description'),
      renderCell: ({ row }: CellType) => <Typography sx={{ color: 'text.secondary' }}>{row.description || '-'}</Typography>
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl('common.table-columns.created-at'),
      field: 'created_at',
      renderCell: ({ row }: CellType) => (
        <Typography sx={{ color: 'text.secondary' }}>{moment(row.created_at).format('DD MMM YYYY')}</Typography>
      )
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: transl('common.table-columns.actions'),
      renderCell: ({ row }: CellType) => (
        <RowOptions
          onEdit={onEdit}
          onDelete={() => onDelete(row.id)}
          item={row}
          options={[]}
          editPermissionRule={{ action: 'update', subject: 'address-master' }}
          deletePermissionRule={{ action: 'delete', subject: 'address-master' }}
        />
      )
    }
  ] as GridColDef[];

const getTitleLinkOrText = (row: AddressMaster) => {
  const childTypeObj = addressTypes.find((typeObj) => typeObj.parent.includes(row?.type as AddressType));
  console.log('childTypeObj', childTypeObj);
  if (childTypeObj) {
    return (
      <Typography
        component={Link}
        href={`/address-master/${childTypeObj.type}/${row.id}`}
        sx={{
          fontWeight: 500,
          textDecoration: 'none',
          color: 'text.secondary',
          '&:hover': { color: 'primary.main' }
        }}
      >
        {row.title}
      </Typography>
    );
  }
  return <Typography sx={{ fontWeight: 500, color: 'text.secondary' }}>{row.title}</Typography>;
};
