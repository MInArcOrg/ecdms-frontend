import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectManagerComponent from 'src/views/pages/projects/detail/project-manager';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

const ProjectManager = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.projectSetup}
      activeSubMenuId={projectSetupIds.generalInfo.projectManager}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <ProjectManagerComponent projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectManager.acl = {
  subject: 'projectManager',
  action: 'view'
};

export default ProjectManager;
