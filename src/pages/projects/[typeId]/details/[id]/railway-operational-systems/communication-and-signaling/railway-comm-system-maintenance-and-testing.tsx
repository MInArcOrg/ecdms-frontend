import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayCommunicationSystemMaintenanceAndTestingList from 'src/views/pages/projects/detail/other/road/railway-communication-system-maintenance-and-testing';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemMaintenanceAndTesting
);

const RailwayCommSystemMaintenanceAndTestingPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemMaintenanceAndTesting
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemMaintenanceAndTesting}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwayCommunicationSystemMaintenanceAndTestingList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayCommSystemMaintenanceAndTestingPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayCommSystemMaintenanceAndTestingPage;
