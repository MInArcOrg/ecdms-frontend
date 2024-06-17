import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import User from 'src/types/admin/user';
import UserAvatar from 'src/views/admin/user/user-avatar';

const UserProfileMd = ({ user, position, readonly = false }: { user: User; position: string; readonly?: boolean }) => {
  const linkComponent = readonly ? 'div' : Link;
  const linkProps = readonly ? {} : { href: `/user/users/${user?.id}/general` };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <UserAvatar user={user} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          flexDirection: 'column'
        }}
      >
        <Typography
          noWrap
          component={linkComponent}
          {...linkProps}
          sx={{
            fontWeight: 500,
            textDecoration: 'none',
            color: 'text.secondary',
            '&:hover': { color: 'primary.main' }
          }}
        >
          {user?.name}
        </Typography>
        <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
          {position}
        </Typography>
      </Box>
    </Box>
  );
};

export default UserProfileMd;
