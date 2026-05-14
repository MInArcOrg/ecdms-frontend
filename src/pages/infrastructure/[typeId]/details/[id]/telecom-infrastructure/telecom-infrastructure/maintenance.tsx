import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import MaintenanceList from 'src/views/pages/projects/detail/other/telecom/maintenance';
import subMenuItems, { findSubMenuItem, telecomInfrastructureId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), telecomInfrastructureId.telecom.maintenance);

const Maintenance = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), telecomInfrastructureId.telecom.maintenance);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.maintenance}
      subMenuItems={subMenuItems}
    >
      <MaintenanceList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
Maintenance.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default Maintenance;
