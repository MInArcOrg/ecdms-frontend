// Import necessary modules and components
import { useRouter } from 'next/router';
import useMember from 'src/hooks/member/member-hook';
import MemberViewPage from 'src/views/member/members/view/member-view-page';

// Define the functional component
const MemberView = () => {
  const router = useRouter();
  const memberId = router.query.id;
  const tab = router.query.tab || 'general';
  const { useGetOneMember } = useMember() as ReturnType<typeof useMember>;
  const { data: member, isLoading } = useGetOneMember(String(memberId));

  return <MemberViewPage isLoading={isLoading} tab={String(tab)} member={member} />;
};

export default MemberView;
