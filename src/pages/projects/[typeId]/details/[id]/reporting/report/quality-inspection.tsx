import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectReportingIds } from '../(subMenuItems)';
import ProjectQualityList from 'src/views/pages/projects/detail/project-quality';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectReportingIds.report.qualityInspection);

const ProjectQualityInspectionPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectReportingIds.report.qualityInspection);
  menuItem;
  console.log('menu item', menuItem)

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.reporting}
      activeSubMenuId={projectReportingIds.report.qualityInspection}
      subMenuItems={subMenuItems}
    >
      <></>
      <ProjectQualityList projectId={String(id)} typeId={String(typeId)} model={menuItem?.model || ''} />
    </ProjectLayout>
  );
};

ProjectQualityInspectionPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ProjectQualityInspectionPage;
