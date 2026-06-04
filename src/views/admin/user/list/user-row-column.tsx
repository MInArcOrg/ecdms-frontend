import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import { Fragment } from 'react';
import User from 'src/types/admin/user';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import UserProfileSmall from '../user-profile-small';
import CustomChip from 'src/@core/components/mui/chip';
import { useQuery } from '@tanstack/react-query';
import modelActionApiService from 'src/services/model-action/model-action-service';
import { ACTION_STATUS } from 'src/configs/action-status';

interface CellType {
  row: User;
}

interface ActionsCellProps {
  row: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  t: any;
  refetch: () => void;
  hanldeStatusChange: (user: User, status: string) => void;
}

const ActionsCell: React.FC<ActionsCellProps> = ({ row, onEdit, onDelete, t, refetch, hanldeStatusChange }) => {
  const { data: actions } = useQuery({
    queryKey: ['model-action', row.id],
    queryFn: () => modelActionApiService.getByModelId(row.id, {})
  });
  const status = actions?.payload?.status;

  // Only include activate/deactivate option if status is not DEFAULT
  row?.role?.is_deactivatable && status !== ACTION_STATUS.DEFAULT
  const statusOptions = row?.role?.is_deactivatable && status !== ACTION_STATUS.DEFAULT ? [
    row?.is_activated
      ? {
        name: t('common.status.deactivate'),
        onClick: () => hanldeStatusChange(row, 'DEACTIVATE'),
        icon: "tabler:x",
        permission: { action: 'activate_user', subject: 'user' }
      }
      : {
        name: t('common.status.activate'),
        onClick: () => hanldeStatusChange(row, 'ACTIVATE'),
        icon: "tabler:check",
        permission: { action: 'activate_user', subject: 'user' }
      }
  ] : [];


  return (
    <Fragment>
      <ModelActionComponent
        model="User"
        model_id={row.id}
        refetchModel={refetch}
        resubmit={function (): void {
          throw new Error('Function not implemented.');
        }}
        title={''}
        postAction={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
      <RowOptions
        onEdit={onEdit}
        onDelete={() => onDelete(row.id)}
        item={row}
        options={statusOptions}
        deletePermissionRule={{
          action: 'delete',
          subject: 'user'
        }}
        editPermissionRule={{
          action: 'update',
          subject: 'user'
        }}
      />
    </Fragment>
  );
};

export const userColumns = (
  onEdit: (user: User) => void,
  onDelete: (id: string) => void,
  t: any,
  refetch: () => void,
  isProfessional: boolean = false,
  hanldeStatusChange: (user: User, status: string) => void
) =>
  [
    {
      flex: 0.25,
      minWidth: 280,
      field: 'full_name',
      headerName: t('department.user-columns.user'),
      renderCell: ({ row }: CellType) => {
        return (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <UserProfileSmall user={row} />
          </Box>
        );
      }
    },
    !isProfessional && {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.department'),
      field: 'department',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.department?.name}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.position'),
      field: 'position',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.position?.name}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.phone'),
      field: 'phone',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.phone}</Typography>;
      }
    },
    {
      flex: 0.15,
      minWidth: 120,
      headerName: t('department.user-columns.status'),
      field: 'status',
      renderCell: ({ row }: CellType) => {
        return <Typography sx={{ color: 'text.secondary' }}>{row?.is_activated ?
          <CustomChip label={t('common.status.active').toUpperCase()} color="success" skin='light' /> :
          <CustomChip label={t('common.status.inactive').toUpperCase()} color="error" skin='light' />}</Typography>;
      }
    },
    {
      flex: 0.1,
      minWidth: 150,
      sortable: false,
      field: 'actions',
      headerName: t('common.table-columns.actions'),
      align: 'right',
      renderCell: ({ row }: CellType) => (
        <ActionsCell
          row={row}
          onEdit={onEdit}
          onDelete={onDelete}
          t={t}
          refetch={refetch}
          hanldeStatusChange={hanldeStatusChange}
        />
      )
    }
  ].filter(Boolean) as GridColDef[];
