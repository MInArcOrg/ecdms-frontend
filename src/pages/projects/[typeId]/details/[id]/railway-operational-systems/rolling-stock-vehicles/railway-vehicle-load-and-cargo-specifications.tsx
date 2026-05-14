import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayVehicleLoadAndCargoSpecificationList from 'src/views/pages/projects/detail/other/road/railway-vehicle-load-and-cargo-specification';

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
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwayVehicleLoadAndCargoSpecificationList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayVehicleLoadAndCargoSpecificationsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleLoadAndCargoSpecificationsPage;
