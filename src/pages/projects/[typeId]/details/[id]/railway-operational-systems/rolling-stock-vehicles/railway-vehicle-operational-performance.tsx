import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayVehicleOperationalPerformanceList from 'src/views/pages/projects/detail/other/road/railway-vehicle-operational-performance';

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
      subMenuItems={subMenuItems}
    >
      <RailwayVehicleOperationalPerformanceList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayVehicleOperationalPerformancePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleOperationalPerformancePage;
