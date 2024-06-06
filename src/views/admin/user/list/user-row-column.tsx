import { GridColDef } from '@mui/x-data-grid';
// ** React Imports
import { MouseEvent, useState } from 'react';

// ** Next Imports

// ** MUI Imports
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Store Imports

// ** Custom Components Imports
import CustomAvatar from 'src/@core/components/mui/avatar';
import CustomChip from 'src/@core/components/mui/chip';

// ** Utils Import

// ** Actions Imports

// ** Third Party Components

// ** Types Imports
import { ThemeColor } from 'src/@core/layouts/types';

// ** Custom Table Components Imports
import moment from 'moment';
import User from 'src/types/admin/user';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import UserProfileSmall from '../user-profile-small';
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

const RowOptions = ({ user, onEdit, onDelete }: { user: User; onEdit: (user: User) => void; onDelete: (id: string) => void }) => {
  // ** Hooks
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(user.id);
    handleCloseDeleteDialog();
  };

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(user);
    handleRowOptionsClose();
  };
  return (
    <>
      <IconButton size="small" onClick={handleRowOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleRowOptionsClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right'
        }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:edit" fontSize={20} />
          Edit
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteDialog} sx={{ '& svg': { mr: 2 } }}>
          <Icon icon="tabler:trash" fontSize={20} />
          Delete
          <DeleteConfirmationDialog
            handleClose={handleCloseDeleteDialog}
            open={isDeleteDialogOpen}
            onCancel={handleCloseDeleteDialog}
            onConfirm={handleDelete}
          />
        </MenuItem>
      </Menu>
    </>
  );
};

export const userColumns = (onEdit: (user: User) => void, onDelete: (id: string) => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'full_name',
      headerName: 'User',
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
      headerName: 'Role',
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
              {row.roles[0]}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Phone',
      field: 'phone',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.phone}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Created At',
      field: 'createdAt',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{moment(row.createdAt).format('DD MMM YYYY')}</Typography>;
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: 'Status',
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
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions onDelete={onDelete} onEdit={onEdit} user={row} />
    }
  ] as GridColDef[];
