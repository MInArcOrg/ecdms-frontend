import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectReportList from 'src/views/pages/projects/detail/report/report';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={7} activeSubMenu={1} subMenuItems={subMenuItems(id as string, String(typeId))}>
      <ProjectReportList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectreport',
  action: 'view'
};

export default ProjectStakeholder;
