import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import MobileNetworkList from 'src/views/pages/projects/detail/other/telecom/mobile-network';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.mobileNetworks.mobileNetwork);

const MobileNetworkPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), mobileSatelliteNetworksId.mobileNetworks.mobileNetwork);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.mobileNetworks.mobileNetwork}
      subMenuItems={subMenuItems}
    >
      <MobileNetworkList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MobileNetworkPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MobileNetworkPage;
