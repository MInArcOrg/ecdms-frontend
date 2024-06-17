import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import User from 'src/types/admin/user';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import UserProfileSmall from '../user-profile-small';

interface CellType {
  row: User;
}

export const userColumns = (onEdit: (user: User) => void, onDelete: (id: string) => void, t: any, refetch: () => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'full_name',
      headerName: t('department.user-columns.user'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserProfileSmall user={row} />
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.phone'),
      field: 'phone',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.phone}</Typography>;
      }
    },
    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'status',
      headerName: t('common.table-columns.status'),
      align: 'right',
      renderCell: ({ row }: CellType) => (
        <Fragment>
          <ModelActionComponent
            model="User"
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
