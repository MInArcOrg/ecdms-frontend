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
    .maintenance_facility_layout_and_design,
);

const MaintenanceFacilityLayoutAndDesignPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.maintenance_facilities
      .maintenance_facility_layout_and_design,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.maintenance_facilities
          .maintenance_facility_layout_and_design
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Maintenance Facility Layout and Design Placeholder</div>
    </ProjectLayout>
  );
};

MaintenanceFacilityLayoutAndDesignPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default MaintenanceFacilityLayoutAndDesignPage;
