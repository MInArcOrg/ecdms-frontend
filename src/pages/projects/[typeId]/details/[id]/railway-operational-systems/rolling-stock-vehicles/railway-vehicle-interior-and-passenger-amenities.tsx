import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

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
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Railway Vehicle Interior and Passenger Amenities Placeholder</div>
        </ProjectLayout>
    );
};

RailwayVehicleInteriorAndPassengerAmenitiesPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RailwayVehicleInteriorAndPassengerAmenitiesPage;