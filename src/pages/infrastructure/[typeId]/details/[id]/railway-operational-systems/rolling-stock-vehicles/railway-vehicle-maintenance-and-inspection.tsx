import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayVehicleMaintenanceAndInspectionList from 'src/views/pages/projects/detail/other/road/railway-vehicle-maintenance-and-inspection';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleMaintenanceAndInspection
);

const RailwayVehicleMaintenanceAndInspectionPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleMaintenanceAndInspection
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleMaintenanceAndInspection}
      subMenuItems={subMenuItems}
    >
      <RailwayVehicleMaintenanceAndInspectionList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayVehicleMaintenanceAndInspectionPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleMaintenanceAndInspectionPage;
