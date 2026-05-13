import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';
import NetworkCoverageList from 'src/views/pages/projects/detail/other/telecom/network-coverage';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), mobileSatelliteNetworksId.mobileNetworks.networkCoverage);

const NetworkCoveragePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), mobileSatelliteNetworksId.mobileNetworks.networkCoverage);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={mobileSatelliteNetworksId.mobileNetworks.networkCoverage}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <NetworkCoverageList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
NetworkCoveragePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default NetworkCoveragePage;
