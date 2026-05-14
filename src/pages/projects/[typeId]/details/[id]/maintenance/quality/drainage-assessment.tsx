import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import DrainageAssessmentList from 'src/views/pages/projects/detail/other/road/drainage-assessment';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectMaintenanceIds.quality.drainageAssessment);

const DrainageAssessment = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectMaintenanceIds.quality.drainageAssessment);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.maintenance}
      activeSubMenuId={projectMaintenanceIds.quality.drainageAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <DrainageAssessmentList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
DrainageAssessment.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DrainageAssessment;
