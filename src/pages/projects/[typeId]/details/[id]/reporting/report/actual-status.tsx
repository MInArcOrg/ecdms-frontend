import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import ProjectReportList from 'src/views/pages/projects/detail/report/report';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.actualStatus);

const ActualStatusPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.actualStatus);
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={projectReportingIds.report.actualStatus}
      subMenuItems={subMenuItems}
    >
      <ProjectReportList projectId={String(id)} />
    </ProjectLayout>
  );
};

ActualStatusPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ActualStatusPage;
