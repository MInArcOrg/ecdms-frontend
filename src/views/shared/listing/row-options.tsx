import { Icon } from '@iconify/react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useState } from 'react';
import { AbilityRule } from 'src/types/general/permission';
import DeleteConfirmationDialog from '../dialog/delete-confirmation-dialog';
import Can from 'src/layouts/components/acl/Can';
import toast from 'react-hot-toast';
import { useQuery } from '@tanstack/react-query';
import modelActionApiService from 'src/services/model-action/model-action-service';
import { ACTION_STATUS } from 'src/configs/action-status';

interface RowOption {
  name: string;
  icon: string;
  onClick: () => void;
  permission: AbilityRule;
}

interface RowOptionsProps<T extends { id?: string }> {
  item: T;
  options?: RowOption[];
  onEdit?: (item: T) => void;
  onDelete?: () => Promise<void> | void;
  deletePermissionRule?: AbilityRule;
  editPermissionRule?: AbilityRule;
}

const RowOptions = <T extends { id?: string }>({
  item,
  options,
  onEdit,
  onDelete,
  deletePermissionRule,
  editPermissionRule,
}: RowOptionsProps<T>) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: actions, refetch } = useQuery({
    queryKey: ['model-action', item.id],
    queryFn: () => item.id ? modelActionApiService.getByModelId(item?.id, {}) : Promise.resolve(null),
    enabled: Boolean(item.id),
  });

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = async () => {
    if (!onDelete) return;

    try {
      await onDelete();
      toast.success('Item successfully deleted');
      handleCloseDeleteDialog();
      refetch?.();
    } catch (err) {
      toast.error('Failed to delete item');
    }
  };

  const handleRowOptionsClick = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleRowOptionsClose = () => setAnchorEl(null);

  const handleEdit = () => {
    if (!onEdit) return;
    onEdit(item);
    handleRowOptionsClose();
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
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{ style: { minWidth: '8rem' } }}
      >
        {options?.map((option, index) => (
          <MenuItem key={index} onClick={option.onClick} sx={{ '& svg': { mr: 2 } }}>
            <Icon icon={option.icon} fontSize={20} />
            {option.name}
          </MenuItem>
        ))}

        {onEdit && actions?.payload?.status !== ACTION_STATUS.DEFAULT && editPermissionRule && (
          <Can do={editPermissionRule.action} on={editPermissionRule.subject}>
            <MenuItem onClick={handleEdit} sx={{ '& svg': { mr: 2 } }}>
              <Icon icon="tabler:edit" fontSize={20} />
              Edit
            </MenuItem>
          </Can>
        )}

        {onDelete && deletePermissionRule && actions?.payload?.status === ACTION_STATUS.REJECTED && (
          <Can do={deletePermissionRule.action} on={deletePermissionRule.subject}>
            <MenuItem onClick={handleOpenDeleteDialog} sx={{ '& svg': { mr: 2 } }}>
              <Icon icon="tabler:trash" fontSize={20} />
              Delete
            </MenuItem>
          </Can>
        )}
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
