import { GridColDef } from '@mui/x-data-grid';
// ** React Imports
import { MouseEvent, useState } from 'react';

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
import Department from 'src/types/team/department';

interface CellType {
  row: Department;
}

const DepartmentOptions = ({
  department,
  onEdit,
  onDelete
}: {
  department: Department;
  onEdit: (department: Department) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks

  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(department.id);
    handleCloseDeleteDialog();
  };

  // ** State
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const rowOptionsOpen = Boolean(anchorEl);

  const handleDepartmentOptionsClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleDepartmentOptionsClose = () => {
    setAnchorEl(null);
  };

  const handleEdit = () => {
    onEdit(department);
    handleDepartmentOptionsClose();
  };

  return (
    <>
      <IconButton size="small" onClick={handleDepartmentOptionsClick}>
        <Icon icon="tabler:dots-vertical" />
      </IconButton>
      <Menu
        keepMounted
        anchorEl={anchorEl}
        open={rowOptionsOpen}
        onClose={handleDepartmentOptionsClose}
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

export const departmentColumns = (onEdit: (department: Department) => void, onDelete: (id: string) => void) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'name',
      headerName: 'Department',
      renderCell: ({ row }: CellType) => {
        return (
          <Typography
            noWrap
            component={Link}
            href={`/team/departments/${row.id}/sub-departments/`}
            sx={{
              fontWeight: 500,
              textDecoration: 'none',
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            {row.name}
          </Typography>
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
      renderCell: ({ row }: CellType) => <DepartmentOptions onEdit={onEdit} onDelete={onDelete} department={row} />
    }
  ] as GridColDef[];
