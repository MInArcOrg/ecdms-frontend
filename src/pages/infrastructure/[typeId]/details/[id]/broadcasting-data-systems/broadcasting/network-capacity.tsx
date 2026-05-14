import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import BroadcastingNetworkCapacityList from 'src/views/pages/projects/detail/other/telecom/broadcasting-network-capacity';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), broadcastingDataSystemsId.broadcasting.networkCapacity);

const BroadcastingNetworkCapacityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), broadcastingDataSystemsId.broadcasting.networkCapacity);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.broadcasting.networkCapacity}
      subMenuItems={subMenuItems}
    >
      <BroadcastingNetworkCapacityList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
BroadcastingNetworkCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BroadcastingNetworkCapacityPage;
