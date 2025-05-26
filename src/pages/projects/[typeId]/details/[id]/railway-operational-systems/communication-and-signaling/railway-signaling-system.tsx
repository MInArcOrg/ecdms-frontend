import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwaySignalingSystem
);

const RailwaySignalingSystemPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwaySignalingSystem
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwaySignalingSystem}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Signaling System Placeholder</div>
    </ProjectLayout>
  );
};

RailwaySignalingSystemPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwaySignalingSystemPage;
