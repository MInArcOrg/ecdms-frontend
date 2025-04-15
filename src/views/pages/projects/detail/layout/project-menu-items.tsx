import { DetailMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectMenuIds = {
  projectSetup: 'PROJECT_SETUP',
  resource: 'RESOURCE',
  reporting: 'REPORTING',
  segment: 'SEGMENT',
  feature: 'FEATURE',
  maintenance: 'MAINTENANCE',
  telecomInfrastructure: 'TELECOM_INFRASTRUCTURE',
  mobileSatelliteNetworks: 'MOBILE_SATELLITE_NETWORKS',
  broadcastingDataSystems: 'BROADCASTING_DATA_SYSTEMS'
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/projects/${typeId}/details/${id}`;

  return [
    {
      id: projectMenuIds.projectSetup,
      title: 'project.navigation.menu.project-setup',
      path: `${baseUrl}/project-setup`
    },
    {
      id: projectMenuIds.resource,
      title: 'project.navigation.menu.resource',
      path: `${baseUrl}/resource`
    },
    {
      id: projectMenuIds.reporting,
      title: 'project.navigation.menu.reporting',
      path: `${baseUrl}/reporting`
    },
    {
      id: projectMenuIds.segment,
      title: 'project.navigation.menu.segment',
      path: `${baseUrl}/segment`,
      type: projectTypesMaster.road
    },
    {
      id: projectMenuIds.feature,
      title: 'project.navigation.menu.feature',
      path: `${baseUrl}/feature`,
      type: projectTypesMaster.road
    },
    {
      id: projectMenuIds.maintenance,
      title: 'project.navigation.menu.maintenance',
      path: `${baseUrl}/maintenance`,
      type: projectTypesMaster.road
    },
    {
      id: projectMenuIds.telecomInfrastructure,
      title: 'project.navigation.menu.telecom-infrastructure',
      path: `${baseUrl}/telecom-infrastructure`,
      type: projectTypesMaster.telecommunication
    },
    {
      id: projectMenuIds.mobileSatelliteNetworks,
      title: 'project.navigation.menu.mobile-satellite-networks',
      path: `${baseUrl}/mobile-satellite-networks`,
      type: projectTypesMaster.telecommunication
    },
    {
      id: projectMenuIds.broadcastingDataSystems,
      title: 'project.navigation.menu.broadcasting-data-systems',
      path: `${baseUrl}/broadcasting-data-systems`,
      type: projectTypesMaster.telecommunication
    },
  ];
};
export const projectTypesMaster = {
  building: 'BUILDING',
  airfieldAirport: 'AIRFILED_AIRPORT',
  railway: 'RAILWAY',
  telecommunication: 'TELECOMMUNICATION',
  road: 'ROAD',
  waterInfrastructure: 'WATER_INFRASTRUCTURE',
};
export type ProjectMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
