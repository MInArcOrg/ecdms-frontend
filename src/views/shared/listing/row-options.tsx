import { Icon } from '@iconify/react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import Can from 'src/layouts/components/acl/Can';
import { AbilityRule } from 'src/types/general/permission';
import DeleteConfirmationDialog from '../dialog/delete-confirmation-dialog';

interface RowOption {
  name: string;
  icon: string;
  onClick: () => void;
  permission: AbilityRule;
}

interface RowOptionsProps<T> {
  item: T;
  options?: RowOption[];
  onEdit?: (item: T) => void;
  onDelete?: () => void;
  deletePermissionRule?: AbilityRule;
  editPermissionRule?: AbilityRule;
}

const RowOptions = <T,>({ item, options, onEdit, onDelete, deletePermissionRule, editPermissionRule }: RowOptionsProps<T>) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);
  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      handleCloseDeleteDialog();
    }
  };
  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleRowOptionsClose = () => {
    setAnchorEl(null);
  };
  const handleEdit = () => {
    if (onEdit) {
      onEdit(item);
      handleRowOptionsClose();
    }
  };

  const rowOptionsOpen = Boolean(anchorEl);

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
        {options?.map((option, index) => (
          <MenuItem key={index} onClick={option.onClick} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={option.icon} fontSize={20} />
            {option.name}
          </MenuItem>
        ))}
        {onEdit && <Can do={editPermissionRule?.action} on={editPermissionRule?.subject}>
          <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:edit" fontSize={20} />
            Edit
          </MenuItem>
        </Can>}
        {onDelete && <Can do={deletePermissionRule?.action} on={deletePermissionRule?.subject}>
          <MenuItem onClick={handleOpenDeleteDialog} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon="tabler:trash" fontSize={20} />
            Delete
          </MenuItem>
        </Can>}
      </Menu>
      <DeleteConfirmationDialog
        handleClose={handleCloseDeleteDialog}
        open={isDeleteDialogOpen}
        onCancel={handleCloseDeleteDialog}
        onConfirm={handleDelete}
      />
    </>
  );
};

export default RowOptions;
