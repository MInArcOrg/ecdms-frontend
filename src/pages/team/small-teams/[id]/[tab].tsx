// Import necessary modules and components
import { useRouter } from 'next/router';
import useSmallTeam from 'src/hooks/team/small-team-hook';
import SmallTeamViewPage from 'src/views/team/small-teams/view/small-team-view-page';

// Define the functional component
const SmallTeamView = () => {
  const router = useRouter();
  const smallTeamId = router.query.id;
  const tab = router.query.tab || 'sub-small-teams';
  const { useGetOneSmallTeam } = useSmallTeam() as ReturnType<typeof useSmallTeam>;
  const { data: smallTeam, isLoading } = useGetOneSmallTeam(String(smallTeamId));

  return <SmallTeamViewPage isLoading={isLoading} tab={String(tab)} smallTeam={smallTeam} />;
};

export default SmallTeamView;
