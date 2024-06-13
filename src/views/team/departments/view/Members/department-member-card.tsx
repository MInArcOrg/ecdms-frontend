import { Box, Button } from '@mui/material';
import Icon from 'src/@core/components/icon';
import CustomAvatar from 'src/@core/components/mui/avatar';
import TeamMember from 'src/types/team/team-member';
import MemberProfileSmall from 'src/views/admin/user/user-profile-md';

const DepartmentMemberCard = ({
  departmentMember,
  onEdit,
  onDelete
}: {
  departmentMember: TeamMember;
  onEdit: (departmentMember: TeamMember) => void;
  onDelete: (departmentMemberId: string) => void;
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
      <MemberProfileSmall member={departmentMember.member} position={departmentMember.position} />
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {departmentMember.is_leader && (
          <CustomAvatar skin="light" color={'primary'} sx={{ width: 20, height: 20, mr: 2 }}>
            <Icon icon={'tabler:star-filled'} />
          </CustomAvatar>
        )}
        <Button variant="tonal" sx={{ p: 2, minWidth: 38, mr: 2 }} color={'secondary'} onClick={() => onEdit(departmentMember)}>
          <Icon icon={'tabler:edit'} />
        </Button>{' '}
        <Button variant="tonal" sx={{ p: 2, minWidth: 38 }} color={'error'} onClick={() => onDelete(departmentMember.id)}>
          <Icon icon={'tabler:trash'} />
        </Button>
      </Box>
    </Box>
  );
};
export default DepartmentMemberCard;
