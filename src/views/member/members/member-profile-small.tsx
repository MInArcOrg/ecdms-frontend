import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import Link from 'next/link';
import Member from 'src/types/member/member';
import Position from 'src/types/team/position';
import UserAvatar from 'src/views/admin/user/user-avatar';

const MemberProfileSmall = ({ member, position, readonly = false }: { member: Member; position?: Position; readonly?: boolean }) => {
  const linkComponent = readonly ? 'div' : Link;
  const linkProps = readonly ? {} : { href: `/member/members/${member?.id}/general` };

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <UserAvatar user={member} />

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
          {member?.name}
        </Typography>
        <Typography noWrap variant="body2" sx={{ color: 'text.disabled' }}>
          {position?.name || 'member'}
        </Typography>
      </Box>
    </Box>
  );
};

export default MemberProfileSmall;
