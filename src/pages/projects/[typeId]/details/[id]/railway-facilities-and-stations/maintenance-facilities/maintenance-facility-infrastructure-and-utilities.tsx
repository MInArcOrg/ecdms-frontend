import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_infrastructure_and_utilities
);

const MaintenanceFacilityInfrastructureAndUtilitiesPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_infrastructure_and_utilities
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
            activeSubMenuId={railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_infrastructure_and_utilities}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Maintenance Facility Infrastructure and Utilities Placeholder</div>
        </ProjectLayout>
    );
};

MaintenanceFacilityInfrastructureAndUtilitiesPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default MaintenanceFacilityInfrastructureAndUtilitiesPage;