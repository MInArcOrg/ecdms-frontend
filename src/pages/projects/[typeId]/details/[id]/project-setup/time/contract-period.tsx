import { Box } from "@mui/material";
import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, { projectSetupIds } from "../(subMenuItems)";

function ProjectVariation() {
  const router = useRouter();
  const { id, typeId } = router.query;
  return (
    <Box>
      <ProjectLayout
        activeMenuId={projectMenuIds.projectSetup}
        activeSubMenuId={projectSetupIds.time.contractPeriod}
        subMenuItems={subMenuItems(id as string, typeId as string)}
      >
        <>Contract Period here</>
      </ProjectLayout>
    </Box>
  );
}

ProjectVariation.acl = {
  action: "view",
  subject: "projectextensiontime",
};
export default ProjectVariation;
