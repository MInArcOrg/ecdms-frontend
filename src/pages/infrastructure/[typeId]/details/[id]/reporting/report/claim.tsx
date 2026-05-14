import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.weatherCondition);

const ProjectClaimPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.weatherCondition);
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.reporting}
      activeSubMenuId={projectReportingIds.report.claim}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <></>
      {/* <ProjectClaim projectId={String(id)} typeId={String(typeId)}  model={menuItem?.model||''}/> */}
    </ProjectLayout>
  );
};

ProjectClaimPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ProjectClaimPage;
