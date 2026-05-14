import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayCommunicationSystemList from 'src/views/pages/projects/detail/other/road/railway-communication-system';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem
);

const RailwayCommunicationSystemPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayCommunicationSystemList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayCommunicationSystemPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayCommunicationSystemPage;
