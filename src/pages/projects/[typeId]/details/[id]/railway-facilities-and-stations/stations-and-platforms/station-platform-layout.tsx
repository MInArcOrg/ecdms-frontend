import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayFacilitiesAndStationsIds,
} from "../(subMenuItems)";
import RailwayStationPlatformLayoutCard from "src/views/pages/projects/detail/other/road/railway-station-platform-layout/railway-station-platform-layout-card";
import RailwayStationPlatformLayoutList from "src/views/pages/projects/detail/other/road/railway-station-platform-layout";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayFacilitiesAndStationsIds.stations_and_platforms
    .station_platform_layout,
);

const StationPlatformLayoutPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms
      .station_platform_layout,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.stations_and_platforms
          .station_platform_layout
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayStationPlatformLayoutList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

StationPlatformLayoutPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default StationPlatformLayoutPage;
