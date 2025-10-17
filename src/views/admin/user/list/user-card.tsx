import { Box, Typography } from '@mui/material';
import CustomChip from 'src/@core/components/mui/chip';
import User from 'src/types/admin/user';
import FileDrawer from 'src/views/components/custom/files-drawer';
import ModelActionComponent from 'src/views/components/custom/model-actions';
import RowOptions from 'src/views/shared/listing/row-options';
import SharedItemViewCard from 'src/views/shared/listing/shared-item-view-card';
import UserProfileSmall from '../user-profile-small';

const UserCard = ({
  user,
  onEdit,
  onDelete,
  refetch,
  t
}: {
  user: User;
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
  refetch: () => void;
  t: any;
}) => {
  return (
    <SharedItemViewCard
      createdAt={user.created_at}
      t={t}
      actions={
        <>
          <FileDrawer id={user.id} type="USER" />
          <ModelActionComponent model="User" model_id={user.id} refetchModel={refetch} resubmit={() => {}} title="" postAction={() => {}} />
          <RowOptions
            onEdit={onEdit}
            onDelete={() => onDelete(user.id)}
            item={user}
            deletePermissionRule={{ action: 'delete', subject: 'user' }}
            editPermissionRule={{ action: 'update', subject: 'user' }}
            options={[]}
          />
        </>
      }
    >
      <Box display="flex" justifyContent={'space-between'}>
        <UserProfileSmall user={user} />
        <CustomChip
          label={user.is_activated ? t('common.status.active') : t('common.status.inactive')}
          color={user.is_activated ? 'success' : 'error'}
          sx={{ mt: 0.5 }}
          size="small"
          skin="light"
        />
      </Box>
      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {user.phone}
      </Typography>

      <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
        {`${user?.position?.name}`} in {`${user?.department?.name}`}
      </Typography>
    </SharedItemViewCard>
  );
};

export default UserCard;
