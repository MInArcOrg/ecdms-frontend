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
import { Box } from '@mui/material';
import Attendance from 'src/types/team/weekly-report';
import { formatCalendar } from 'src/utils/formatter/date';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';

interface CellType {
  row: Attendance;
}

const RowOptions = ({
  weeklyReport,
  onEdit,
  onDelete
}: {
  weeklyReport: Attendance;
  onEdit: (weeklyReport: Attendance) => void;
  onDelete: (id: string) => void;
}) => {
  // ** Hooks
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(weeklyReport.id);
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
    onEdit(weeklyReport);
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
          Attendees
        </MenuItem>
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

export const weeklyReportColumns = (
  onEdit: (weeklyReport: Attendance) => void,
  onDelete: (id: string) => void,
  transl: (item: string) => string
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'Date',
      headerName: transl('date'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ color: 'text.secondary' }}>{formatCalendar(row.date)}</Typography>
          </Box>
        );
      }
    },

    {
      flex: 0.15,
      minWidth: 120,
      headerName: 'Description',
      field: 'description',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{String(row.description)}</Typography>;
      }
    },

    {
      flex: 0.1,
      minWidth: 100,
      sortable: false,
      field: 'actions',
      headerName: 'Actions',
      renderCell: ({ row }: CellType) => <RowOptions onEdit={onEdit} onDelete={onDelete} weeklyReport={row} />
    }
  ] as GridColDef[];
