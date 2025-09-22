import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import ProjectStakeholderList from "src/views/pages/projects/detail/project-stakeholder/project-stakholder";
import subMenuItems, { projectSetupIds } from "../(subMenuItems)";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.projectSetup}
      activeSubMenuId={projectSetupIds.stakeholders.stakeholders}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {" "}
      <ProjectStakeholderList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: "projectstakeholder",
  action: "view_projectstakeholder",
};

export default ProjectStakeholder;
