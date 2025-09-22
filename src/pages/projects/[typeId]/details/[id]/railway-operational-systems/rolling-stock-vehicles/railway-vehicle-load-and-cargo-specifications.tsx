import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleLoadAndCargoSpecifications
);

const RailwayVehicleLoadAndCargoSpecificationsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleLoadAndCargoSpecifications
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleLoadAndCargoSpecifications}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Vehicle Load and Cargo Specifications Placeholder</div>
    </ProjectLayout>
  );
};

RailwayVehicleLoadAndCargoSpecificationsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleLoadAndCargoSpecificationsPage;
