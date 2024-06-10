import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import CustomChip from 'src/@core/components/mui/chip';
import { ThemeColor } from 'src/@core/layouts/types';
import User from 'src/types/admin/user';
import RowOptions from 'src/views/shared/listing/row-options';
import UserProfileSmall from '../user-profile-small';
import { formatCreatedAt } from 'src/utils/formatter/date';

interface UserRoleType {
  [key: string]: { icon: string; color: string };
}

interface UserStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: User;
}

// ** renders client column
const userRoleObj: UserRoleType = {
  admin: { icon: 'tabler:device-laptop', color: 'secondary' },
  author: { icon: 'tabler:circle-check', color: 'success' },
  editor: { icon: 'tabler:edit', color: 'info' },
  maintainer: { icon: 'tabler:chart-pie-2', color: 'primary' },
  subscriber: { icon: 'tabler:user', color: 'warning' }
};

const userStatusObj: UserStatusType = {
  active: 'success',
  pending: 'warning',
  inactive: 'secondary'
};

export const userColumns = (onEdit: (user: User) => void, onDelete: (id: string) => void, t: any) =>
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
      field: 'role',
      minWidth: 170,
      headerName: t('department.user-columns.role'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar
              skin="light"
              sx={{ mr: 4, width: 30, height: 30 }}
              color={(userRoleObj['admin']?.color as ThemeColor) || 'primary'}
            >
              <Icon icon={userRoleObj['admin']?.icon} />
            </CustomAvatar>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.position_name}
            </Typography>
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
      minWidth: 110,
      field: 'status',
      headerName: t('common.table-columns.status'),
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={'active'}
            color={userStatusObj['active']}
            sx={{ textTransform: 'capitalize' }}
          />
        );
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
