// pages/team/departments/[id].tsx
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const SmallTeamDetails = () => {
  const router = useRouter();
  const { id, tab } = router.query;

  useEffect(() => {
    // Check if the tab parameter is empty or not provided, then redirect to the first tab
    if (!tab) {
      router.replace(`/team/small-teams/${id}/sub-departments`);
    }
  }, [id, tab, router]);

  // Your component logic for the department details goes here...
  return (
    <div>
      SmallTeam ID: {id}, Tab: {tab}
      {/* Your component code for the department details goes here */}
    </div>
  );
};

export default SmallTeamDetails;
