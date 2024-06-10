import { GridColDef } from '@mui/x-data-grid';
// ** React Imports
import { Fragment, MouseEvent, useState } from 'react';

// ** Next Imports
import Link from 'next/link';

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
import Position from 'src/types/department/position';
import CustomAvatar from 'src/@core/components/mui/avatar';

interface CellType {
  row: Position;
}

const RowOptions = ({
  position,
  onEdit,
  onDelete
}: {
  position: Position;
  onEdit: (position: Position) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(position.id);
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
    onEdit(position);
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

export const positionColumns = (onEdit: (position: Position) => void, onDelete: (id: string) => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'Position',
      renderCell: ({ row }: CellType) => {
        return (
          <Fragment>
            {row.is_head && (
              <CustomAvatar skin="light" color={'primary'} sx={{ width: 20, height: 20, mr: 2 }}>
                <Icon icon={'tabler:star-filled'} />
              </CustomAvatar>
            )}

            <Typography
              noWrap
              component={Link}
              href={`/team/positions/${row.id}/sub-positions/`}
              sx={{
                fontWeight: 500,
                textDecoration: 'none',
                color: 'text.secondary',
                '&:hover': { color: 'primary.main' }
              }}
            >
              {row.name}
            </Typography>
          </Fragment>
        );
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
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions onEdit={onEdit} onDelete={onDelete} position={row} />
    }
  ] as GridColDef[];
