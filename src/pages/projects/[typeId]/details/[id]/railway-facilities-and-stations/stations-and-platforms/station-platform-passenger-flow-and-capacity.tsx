import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayFacilitiesAndStationsIds } from '../(subMenuItems)';

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
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Station Platform Passenger Flow and Capacity Placeholder</div>
    </ProjectLayout>
  );
};

StationPlatformPassengerFlowAndCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default StationPlatformPassengerFlowAndCapacityPage;
