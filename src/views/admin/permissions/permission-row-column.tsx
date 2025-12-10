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
import RowOptions from 'src/views/shared/listing/row-options';

interface CellType {
  row: Permission;
}


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
      renderCell: ({ row }: CellType) => <RowOptions item={row} onEdit={onEdit} onDelete={() => onDelete(row.id)}
        deletePermissionRule={{
          action: 'delete',
          subject: 'permission'
        }} editPermissionRule={{
          action: 'update',
          subject: 'permission'
        }} />
    }
  ] as GridColDef[];
