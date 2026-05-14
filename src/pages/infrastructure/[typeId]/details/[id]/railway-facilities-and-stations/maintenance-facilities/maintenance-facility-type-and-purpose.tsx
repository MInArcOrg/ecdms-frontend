import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';
import RailwayMaintenanceFacilityTypeAndPurposeList from 'src/views/pages/projects/detail/other/road/railway-maintenance-facility-type-and-purpose';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_type_and_purpose
);

const MaintenanceFacilityTypeAndPurposePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_type_and_purpose
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_type_and_purpose}
      subMenuItems={subMenuItems}
    >
      <RailwayMaintenanceFacilityTypeAndPurposeList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

MaintenanceFacilityTypeAndPurposePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MaintenanceFacilityTypeAndPurposePage;
