import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';

const StakeholderOther = () => {
  const router = useRouter();

  // Extract dynamic route parameters from the URL
  const { typeId, id } = router.query;

  useEffect(() => {
    if (typeId && id) {
      // Build the new URL dynamically
      const newUrl = `/stakeholders/${typeId}/details/${id}/other/study-fields`;

      // Simulate a condition or action before redirecting
      router.push(newUrl); // Redirect to the constructed URL
    }
  }, [typeId, id, router]);

  return (
    <>
      <LoadingPlaceholder />
    </>
  );
};

export default StakeholderOther;
