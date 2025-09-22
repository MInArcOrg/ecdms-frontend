import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleOperationalPerformance
);

const RailwayVehicleOperationalPerformancePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleOperationalPerformance
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleOperationalPerformance}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Vehicle Operational Performance Placeholder</div>
    </ProjectLayout>
  );
};

RailwayVehicleOperationalPerformancePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleOperationalPerformancePage;
