import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), broadcastingDataSystemsId.broadcasting.networkCoverage);

const BroadcastingNetworkCoveragePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={broadcastingDataSystemsId.broadcasting.networkCoverage}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>Broadcasting Network Coverage</>
    </ProjectLayout>
  );
};

// Access control configuration
BroadcastingNetworkCoveragePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BroadcastingNetworkCoveragePage;
