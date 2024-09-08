import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectPlanList from 'src/views/pages/projects/detail/plan/plan';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={5} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <ProjectPlanList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectplan',
  action: 'view'
};

export default ProjectStakeholder;
