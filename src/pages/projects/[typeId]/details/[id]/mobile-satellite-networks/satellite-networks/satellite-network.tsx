import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import SatelliteNetworkList from 'src/views/pages/projects/detail/other/telecom/satellite-network';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.satelliteNetworks.satelliteNetwork);

const SatelliteNetworkPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    mobileSatelliteNetworksId.satelliteNetworks.satelliteNetwork
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.satelliteNetworks.satelliteNetwork}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SatelliteNetworkList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SatelliteNetworkPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SatelliteNetworkPage;
