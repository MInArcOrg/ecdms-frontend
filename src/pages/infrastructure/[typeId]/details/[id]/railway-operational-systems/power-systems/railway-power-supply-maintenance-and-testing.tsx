import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayPowerSupplyMaintenanceAndTestingList from 'src/views/pages/projects/detail/other/road/railway-power-supply-maintenance-and-testing';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting
);

const RailwayPowerSupplyMaintenanceAndTestingPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayPowerSupplyMaintenanceAndTestingList
        otherSubMenu={menuItem}
        projectId={id as string} typeId={typeId as string} />
    </ProjectLayout>
  );
};

RailwayPowerSupplyMaintenanceAndTestingPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayPowerSupplyMaintenanceAndTestingPage;
