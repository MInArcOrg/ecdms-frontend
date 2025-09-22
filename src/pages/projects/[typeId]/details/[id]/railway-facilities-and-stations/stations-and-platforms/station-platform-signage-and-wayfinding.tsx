import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayFacilitiesAndStationsIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayFacilitiesAndStationsIds.stations_and_platforms
    .station_platform_signage_and_wayfinding,
);

const StationPlatformSignageAndWayfindingPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms
      .station_platform_signage_and_wayfinding,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.stations_and_platforms
          .station_platform_signage_and_wayfinding
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Station Platform Signage and Wayfinding Placeholder</div>
    </ProjectLayout>
  );
};

StationPlatformSignageAndWayfindingPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default StationPlatformSignageAndWayfindingPage;
