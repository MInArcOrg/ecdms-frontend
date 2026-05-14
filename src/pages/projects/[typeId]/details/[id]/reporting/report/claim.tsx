import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import ProjectClaimList from 'src/views/pages/projects/detail/project-claims';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.claim);

const ProjectClaimPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.claim);
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.reporting}
      activeSubMenuId={projectReportingIds.report.claim}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <ProjectClaimList projectId={id as string} />
    </ProjectLayout>
  );
};

ProjectClaimPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ProjectClaimPage;
