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
import Member from 'src/types/member/member';
import DeleteConfirmationDialog from 'src/views/shared/dialog/delete-confirmation-dialog';
import MemberProfileSmall from '../member-profile-small';

interface MemberStatusType {
  [key: string]: ThemeColor;
}

interface CellType {
  row: Member;
}

const memberStatusObj: MemberStatusType = {
  active: 'success',
  inactive: 'warning',
  suspended: 'error'
};

const RowOptions = ({ member, onEdit, onDelete }: { member: Member; onEdit: (member: Member) => void; onDelete: (id: string) => void }) => {
  // ** Hooks
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);

  const handleOpenDeleteDialog = () => setDeleteDialogOpen(true);
  const handleCloseDeleteDialog = () => setDeleteDialogOpen(false);

  const handleDelete = () => {
    onDelete(member.id);
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
    onEdit(member);
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

export const memberColumns = (onEdit: (member: Member) => void, onDelete: (id: string) => void, transl: (item: string) => string) => {
  return [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'full_name',
      headerName: transl('member'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MemberProfileSmall member={row} />
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      field: 'nationality',
      minWidth: 170,
      headerName: transl('role'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <CustomAvatar skin="light" sx={{ mr: 4, width: 30, height: 30 }} color={'secondary'}>
              <Icon icon={'tabler:flag'} />
            </CustomAvatar>
            <Typography noWrap sx={{ color: 'text.secondary', textTransform: 'capitalize' }}>
              {row.nationality}
            </Typography>
          </Box>
        );
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl('phone'),
      field: 'phone',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{/* {row.phone} */}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: transl('registration_date'),
      field: 'registration_date',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{moment(row.registration_date).format('DD MMM YYYY')}</Typography>;
      }
    },

    {
      flex: 0.1,
      minWidth: 110,
      field: 'status',
      headerName: transl('status'),
      renderCell: ({ row }: CellType) => {
        return (
          <CustomChip
            rounded
            skin="light"
            size="small"
            label={row.status.toUpperCase()}
            color={memberStatusObj[row.status]}
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
      headerName: transl('actions'),
      renderCell: ({ row }: CellType) => <RowOptions onDelete={onDelete} onEdit={onEdit} member={row} />
    }
  ] as GridColDef[];
};
