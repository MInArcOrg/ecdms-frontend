import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import MaintenanceHistoryList from 'src/views/pages/projects/detail/other/road/maintenance-history';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectMaintenanceIds.maintenance.maintenanceHistory);

const MaintenanceHistory = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectMaintenanceIds.maintenance.maintenanceHistory);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.maintenance}
      activeSubMenuId={projectMaintenanceIds.maintenance.maintenanceHistory}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <MaintenanceHistoryList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MaintenanceHistory.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MaintenanceHistory;
