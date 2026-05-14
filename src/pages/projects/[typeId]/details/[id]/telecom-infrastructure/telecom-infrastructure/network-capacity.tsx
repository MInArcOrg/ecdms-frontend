import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import NetworkCapacityList from 'src/views/pages/projects/detail/other/telecom/network-capacity';
import subMenuItems, { findSubMenuItem, telecomInfrastructureId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), telecomInfrastructureId.telecom.networkCapacity);

const NetworkCapacity = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), telecomInfrastructureId.telecom.networkCapacity);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.networkCapacity}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <NetworkCapacityList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
NetworkCapacity.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default NetworkCapacity;
