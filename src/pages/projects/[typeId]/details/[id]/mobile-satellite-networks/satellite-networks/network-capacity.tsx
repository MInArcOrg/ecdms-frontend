import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import SatelliteNetworkCapacityList from 'src/views/pages/projects/detail/other/telecom/satellite-network-capacity';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.satelliteNetworks.networkCapacity);

const SatelliteNetworkCapacityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), mobileSatelliteNetworksId.satelliteNetworks.networkCapacity);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.satelliteNetworks.networkCapacity}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SatelliteNetworkCapacityList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SatelliteNetworkCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SatelliteNetworkCapacityPage;
