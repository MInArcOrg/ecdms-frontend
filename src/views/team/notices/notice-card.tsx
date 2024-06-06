import { Card, CardActions, CardContent, IconButton, Menu, MenuItem, Typography } from '@mui/material';
import { ComponentType, MouseEvent, useState } from 'react';
import Icon from 'src/@core/components/icon';
import Notice from 'src/types/team/notice';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';

const NoticeCard: ComponentType<{ onEditClick: (notice: Notice) => void; notice: Notice; onDelete: (id: string) => void }> = ({
  onEditClick,
  notice,
  onDelete
}) => {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" className="mbe-2">
          {notice.title}
        </Typography>

        <Typography color="text.secondary">{notice.content}</Typography>
      </CardContent>
      <CardActions className="card-actions-dense">
        <NoticeOptions onDelete={onDelete} onEdit={onEditClick} notice={notice} />
      </CardActions>
    </Card>
  );
};
const NoticeOptions = ({
  notice,
  onEdit,
  onDelete
}: {
  notice: Notice;
  onEdit: (notice: Notice) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(notice.id);
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
    onEdit(notice);
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
export default NoticeCard;
