import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';
import DrainageMaintenanceList from 'src/views/pages/projects/detail/other/road/drainage-maintenance';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectMaintenanceIds.maintenance.drainageMaintenance);

const DrainageMaintenance = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;
  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectMaintenanceIds.maintenance.drainageMaintenance);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.maintenance}
      activeSubMenuId={projectMaintenanceIds.maintenance.drainageMaintenance}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <DrainageMaintenanceList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />

    </ProjectLayout>
  );
};

// Access control configuration
DrainageMaintenance.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default DrainageMaintenance;
