import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import MobileNetworkCapacityList from 'src/views/pages/projects/detail/other/telecom/mobile-network-capacity';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.mobileNetworks.networkCapacity);

const NetworkCapacityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), mobileSatelliteNetworksId.mobileNetworks.networkCapacity);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.mobileNetworks.networkCapacity}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <MobileNetworkCapacityList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
NetworkCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default NetworkCapacityPage;
