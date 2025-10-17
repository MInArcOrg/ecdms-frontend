import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_surface_and_finishes
);

const StationPlatformSurfaceAndFinishesPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_surface_and_finishes
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_surface_and_finishes}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Station Platform Surface and Finishes Placeholder</div>
    </ProjectLayout>
  );
};

StationPlatformSurfaceAndFinishesPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default StationPlatformSurfaceAndFinishesPage;
