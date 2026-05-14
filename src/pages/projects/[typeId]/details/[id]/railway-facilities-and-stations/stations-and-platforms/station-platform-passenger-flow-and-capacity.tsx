import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';
import RailwayStationPlatformPassengerFlowAndCapacityList from 'src/views/pages/projects/detail/other/road/railway-station-platform-passenger-flow-and-capacity';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_passenger_flow_and_capacity
);

const StationPlatformPassengerFlowAndCapacityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_passenger_flow_and_capacity
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayFacilitiesAndStations}
      activeSubMenuId={railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_passenger_flow_and_capacity}
      subMenuItems={subMenuItems}
    >
      <RailwayStationPlatformPassengerFlowAndCapacityList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

StationPlatformPassengerFlowAndCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default StationPlatformPassengerFlowAndCapacityPage;
