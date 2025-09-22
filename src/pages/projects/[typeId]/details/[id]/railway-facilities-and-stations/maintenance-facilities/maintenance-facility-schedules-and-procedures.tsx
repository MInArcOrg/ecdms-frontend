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
    .maintenance_facility_schedules_and_procedures,
);

const MaintenanceFacilitySchedulesAndProceduresPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.maintenance_facilities
      .maintenance_facility_schedules_and_procedures,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.maintenance_facilities
          .maintenance_facility_schedules_and_procedures
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Maintenance Facility Schedules and Procedures Placeholder</div>
    </ProjectLayout>
  );
};

MaintenanceFacilitySchedulesAndProceduresPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default MaintenanceFacilitySchedulesAndProceduresPage;
