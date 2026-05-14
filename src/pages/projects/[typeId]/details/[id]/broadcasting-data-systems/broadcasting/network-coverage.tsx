import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import BroadcastingNetworkCoverageList from 'src/views/pages/projects/detail/other/telecom/broadcasting-network-coverage';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), broadcastingDataSystemsId.broadcasting.networkCoverage);

const BroadcastingNetworkCoveragePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), broadcastingDataSystemsId.broadcasting.networkCoverage);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.broadcasting.networkCoverage}
      subMenuItems={subMenuItems}
    >
      <BroadcastingNetworkCoverageList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
BroadcastingNetworkCoveragePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BroadcastingNetworkCoveragePage;
