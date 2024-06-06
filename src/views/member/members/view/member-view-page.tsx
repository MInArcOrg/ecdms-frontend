// ** MUI Imports
import Grid from '@mui/material/Grid';
import Member from 'src/types/member/member';

// ** Types

// ** Demo Components Imports
import MemberViewLeft from 'src/views/member/members/view/member-view-left';
import MemberViewRight from './member-view-right';

type Props = {
  tab: string;
  member: Member;
  isLoading: boolean;
};

const MemberView = ({ tab, member, isLoading }: Props) => {
  return (
    <Grid container spacing={6}>
      <Grid item xs={12} md={5} lg={4}>
        <MemberViewLeft member={member} />
      </Grid>
      <Grid item xs={12} md={7} lg={8}>
        <MemberViewRight isLoading={isLoading} tab={tab} member={member} />
      </Grid>
    </Grid>
  );
};

export default MemberView;
