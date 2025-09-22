import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayFacilitiesAndStationsIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayFacilitiesAndStationsIds.maintenance_facilities
    .maintenance_facility_environmental_and_other_factors,
);

const MaintenanceFacilityEnvironmentalAndOtherFactorsPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.maintenance_facilities
      .maintenance_facility_environmental_and_other_factors,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.maintenance_facilities
          .maintenance_facility_environmental_and_other_factors
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>
        Maintenance Facility Environmental and Other Factors Placeholder
      </div>
    </ProjectLayout>
  );
};

MaintenanceFacilityEnvironmentalAndOtherFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default MaintenanceFacilityEnvironmentalAndOtherFactorsPage;
