import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RailwayStationPlatformStructuralElementList from 'src/views/pages/projects/detail/other/road/railway-station-platform-structural-element';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_structural_elements
);

const StationPlatformStructuralElementsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_structural_elements
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_structural_elements}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayStationPlatformStructuralElementList projectId={id as string} otherSubMenu={menuItem} typeId={typeId as string} />
    </ProjectLayout>
  );
};

StationPlatformStructuralElementsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default StationPlatformStructuralElementsPage;
