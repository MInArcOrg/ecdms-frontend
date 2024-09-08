import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';

const StakeholderGeneral = () => {
  const router = useRouter();

  // Extract dynamic route parameters from the URL
  const { typeId, id } = router.query;

  useEffect(() => {
    if (typeId && id) {
      // Build the new URL dynamically
      const newUrl = `/stakeholders/${typeId}/details/${id}/general/stakeholder`;

      // Simulate a condition or action before redirecting
      const timer = setTimeout(() => {
        router.push(newUrl); // Redirect to the constructed URL
      }, 3000); // Redirect after 3 seconds

      return () => clearTimeout(timer); // Cleanup the timer on unmount
    }
  }, [typeId, id, router]);

  return (
    <>
      <LoadingPlaceholder />
    </>
  );
};

export default StakeholderGeneral;
