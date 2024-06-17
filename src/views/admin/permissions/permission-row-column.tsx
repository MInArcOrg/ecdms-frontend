import { GridColDef } from '@mui/x-data-grid';
// ** React Imports
import { MouseEvent, useState } from 'react';

// ** Next Imports

// ** MUI Imports
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// ** Icon Imports
import Icon from 'src/@core/components/icon';

// ** Types Imports

// ** Custom Table Components Imports
import moment from 'moment';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import Permission from 'src/types/admin/role/permission';

interface CellType {
  row: Permission;
}

const RowOptions = ({
  permission,
  onEdit,
  onDelete
}: {
  permission: Permission;
  onEdit: (permission: Permission) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(permission.id);
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
    onEdit(permission);
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

export const permissionColumns = (onEdit: (permission: Permission) => void, onDelete: (id: string) => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'Permission',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.name}</Typography>;
      }
    },

    {
      flex: 0.25,
      minWidth: 280,
      field: 'model',
      headerName: 'Model',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.model}</Typography>;
      }
    },

    {
      flex: 0.25,
      minWidth: 280,
      field: 'module',
      headerName: 'Module',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row.module}</Typography>;
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
      renderCell: ({ row }: CellType) => <RowOptions onEdit={onEdit} onDelete={onDelete} permission={row} />
    }
  ] as GridColDef[];
