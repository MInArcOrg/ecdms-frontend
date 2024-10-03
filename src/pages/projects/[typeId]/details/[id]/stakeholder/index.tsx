import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectStakeholderList from 'src/views/pages/projects/detail/project-stakeholder/project-stakholder';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <ProjectLayout activeMenu={3}>
      <ProjectStakeholderList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectstakeholder',
  action: 'view_projectstakeholder'
};

export default ProjectStakeholder;
