import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectResourceList from 'src/views/pages/projects/detail/resource';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ProjectLayout activeMenu={6} activeSubMenu={0}>
      <ProjectResourceList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectplan',
  action: 'view'
};

export default ProjectStakeholder;
