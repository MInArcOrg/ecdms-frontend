import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ReportSummary from 'src/views/pages/projects/detail/report/summary';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={7} activeSubMenu={0} subMenuItems={subMenuItems(id as string, String(typeId))}>
      {/* <ProjectReportList projectId={String(id)}  /> */}
      <></>
      <ReportSummary projectId={String(id)}></ReportSummary>
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectreport',
  action: 'view'
};

export default ProjectStakeholder;
