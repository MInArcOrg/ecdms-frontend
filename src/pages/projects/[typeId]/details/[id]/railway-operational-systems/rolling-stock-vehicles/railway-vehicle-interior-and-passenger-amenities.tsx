import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayVehicleInteriorAndPassengerAmenityList from 'src/views/pages/projects/detail/other/road/railway-vehicle-interior-and-passenger-amenity';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleInteriorAndPassengerAmenities
);

const RailwayVehicleInteriorAndPassengerAmenitiesPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleInteriorAndPassengerAmenities
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleInteriorAndPassengerAmenities}
      subMenuItems={subMenuItems}
    >
      <RailwayVehicleInteriorAndPassengerAmenityList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayVehicleInteriorAndPassengerAmenitiesPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleInteriorAndPassengerAmenitiesPage;
