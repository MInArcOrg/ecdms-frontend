import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectManagerComponent from 'src/views/pages/projects/detail/project-manager';
import subMenuItems from './(subMenuItems)';

const ProjectManager = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={4} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectManagerComponent projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectManager.acl = {
  subject: 'projectManager',
  action: 'view_projectmanager'
};

export default ProjectManager;
