import { useRouter } from 'next/router';
import { useEffect } from 'react';
import LoadingPlaceholder from 'src/views/components/loader';

const ProjectGeneral = () => {
  const router = useRouter();

  // Extract dynamic route parameters from the URL
  const { typeId, id } = router.query;

  useEffect(() => {
    if (typeId && id) {
      // Build the new URL dynamically
      const newUrl = `/projects/${typeId}/details/${id}/project-setup/general-info/project-info`;

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
ProjectGeneral.acl = {
  action: 'view',
  subject: 'project'
};

export default ProjectGeneral;
