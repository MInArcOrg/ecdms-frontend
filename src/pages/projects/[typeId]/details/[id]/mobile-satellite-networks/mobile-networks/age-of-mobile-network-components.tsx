import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import MobileNetworkComponentAgeList from 'src/views/pages/projects/detail/other/telecom/mobile-network-component-age';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.mobileNetworks.ageOfMobileNetworkComponents);

const AgeOfMobileNetworkComponentsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    mobileSatelliteNetworksId.mobileNetworks.ageOfMobileNetworkComponents
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.mobileNetworks.ageOfMobileNetworkComponents}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <MobileNetworkComponentAgeList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
AgeOfMobileNetworkComponentsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default AgeOfMobileNetworkComponentsPage;
