import { useRouter } from "next/router";
import { useEffect } from "react";
import LoadingPlaceholder from "src/views/components/loader";

const ProjectGeneral = () => {
  const router = useRouter();

  // Extract dynamic route parameters from the URL
  const { typeId, id } = router.query;

  useEffect(() => {
    if (typeId && id) {
      // Build the new URL dynamically
      const newUrl = `/projects/${typeId}/details/${id}/railway-track-infrastructure/track-systems/tracks-data`;

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

export default ProjectGeneral;
