import { Box, Button } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import Member from 'src/types/member/member';
import Attendance from 'src/types/team/attendance';
import MemberProfileSmall from 'src/views/member/members/member-profile-small';

const SmallTeamMemberCard = ({
  smallTeamMember,
  onEdit,
  onDelete
}: {
  smallTeamMember: Member & { attendance: Attendance[] };
  onEdit: (smallTeamMember: Member) => void;
  onDelete: (smallTeamMemberId: string) => void;
}) => {
  return (
    <Box
      sx={{
        gap: 2,
        px: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        '&:not(:last-of-type)': { mb: 4 }
      }}
    >
      <MemberProfileSmall member={smallTeamMember} />

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            justifyContent: 'space-between'
          }}
        >
          {smallTeamMember?.attendance?.map((attendance: Attendance) => (
            <CustomAvatar
              key={attendance.id}
              skin="light"
              color={attendance.status ? 'success' : 'error'}
              sx={{ width: 20, height: 20, mr: 2 }}
            >
              <Icon icon={attendance.status ? 'tabler:check' : 'tabler:x'} />
            </CustomAvatar>
          ))}
        </Box>
        <Button variant="tonal" sx={{ p: 2, minWidth: 38, mr: 2 }} color={'secondary'} onClick={() => onEdit(smallTeamMember)}>
          <Icon icon={'tabler:edit'} />
        </Button>{' '}
        <Button variant="tonal" sx={{ p: 2, minWidth: 38 }} color={'error'} onClick={() => onDelete(smallTeamMember.id)}>
          <Icon icon={'tabler:trash'} />
        </Button>
      </Box>
    </Box>
  );
};
export default SmallTeamMemberCard;
