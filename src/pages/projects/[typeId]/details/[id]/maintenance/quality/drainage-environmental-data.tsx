import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';
import EnvironmentalDataList from 'src/views/pages/projects/detail/other/road/environmental-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectMaintenanceIds.quality.drainageEnvironmentalData);

const DrainageEnvironmentalData = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectMaintenanceIds.quality.drainageEnvironmentalData);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.maintenance}
      activeSubMenuId={projectMaintenanceIds.quality.drainageEnvironmentalData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <EnvironmentalDataList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
DrainageEnvironmentalData.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DrainageEnvironmentalData;
