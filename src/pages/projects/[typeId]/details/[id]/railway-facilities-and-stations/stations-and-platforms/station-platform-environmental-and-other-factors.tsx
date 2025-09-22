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
    .station_platform_environmental_and_other_factors,
);

const StationPlatformEnvironmentalAndOtherFactorsPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms
      .station_platform_environmental_and_other_factors,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={
        railwayFacilitiesAndStationsIds.stations_and_platforms
          .station_platform_environmental_and_other_factors
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Station Platform Environmental and Other Factors Placeholder</div>
    </ProjectLayout>
  );
};

StationPlatformEnvironmentalAndOtherFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default StationPlatformEnvironmentalAndOtherFactorsPage;
