import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import SatelliteNetworkComponentManufacturerList from 'src/views/pages/projects/detail/other/telecom/satellite-network-component-manufacturer';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  mobileSatelliteNetworksId.satelliteNetworks.manufacturerOfSatelliteNetworkComponents
);

const ManufacturerOfSatelliteNetworkComponentsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    mobileSatelliteNetworksId.satelliteNetworks.manufacturerOfSatelliteNetworkComponents
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.satelliteNetworks.manufacturerOfSatelliteNetworkComponents}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SatelliteNetworkComponentManufacturerList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
ManufacturerOfSatelliteNetworkComponentsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ManufacturerOfSatelliteNetworkComponentsPage;
