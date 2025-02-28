import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectManagerComponent from 'src/views/pages/projects/detail/project-manager';
import subMenuItems from './(subMenuItems)';

const ProjectStatus = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={4} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectManagerComponent projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStatus.acl = {
  subject: 'projectstatus',
  action: 'view_projectstatus'
};

export default ProjectStatus;
