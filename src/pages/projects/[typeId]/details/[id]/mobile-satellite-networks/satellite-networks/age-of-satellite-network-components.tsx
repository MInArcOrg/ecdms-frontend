import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.satelliteNetworks.ageOfSatelliteNetworkComponents);

const AgeOfSatelliteNetworkComponentsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  // const menuItem = findSubMenuItem(
  //   subMenuItems(id as string, typeId as string),
  //   mobileSatelliteNetworksId.satelliteNetworks.ageOfSatelliteNetworkComponents
  // );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.satelliteNetworks.ageOfSatelliteNetworkComponents}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <SatelliteInfrastructureAgeList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
      <> Age of Satelite network </>
    </ProjectLayout>
  );
};

// Access control configuration
AgeOfSatelliteNetworkComponentsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default AgeOfSatelliteNetworkComponentsPage;
