import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';
import RailwayMaintenanceFacilityAndSecurityList from 'src/views/pages/projects/detail/other/road/railway-maintenance-facility-and-security';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_safety_and_security
);

const MaintenanceFacilitySafetyAndSecurityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_safety_and_security
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_safety_and_security}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayMaintenanceFacilityAndSecurityList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

MaintenanceFacilitySafetyAndSecurityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MaintenanceFacilitySafetyAndSecurityPage;
