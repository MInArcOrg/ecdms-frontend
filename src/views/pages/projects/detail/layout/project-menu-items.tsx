import { DetailMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const projectMenuIds = {
  projectSetup: "PROJECT_SETUP",
  resource: "RESOURCE",
  reporting: "REPORTING",
  segment: "SEGMENT",
  feature: "FEATURE",
  maintenance: "MAINTENANCE",
  telecomInfrastructure: "TELECOM_INFRASTRUCTURE",
  mobileSatelliteNetworks: "MOBILE_SATELLITE_NETWORKS",
  broadcastingDataSystems: "BROADCASTING_DATA_SYSTEMS",
  powerGeneration: "POWER_GENERATION",
  powerInfrastructure: "POWER_INFRASTRUCTURE",
  regulation: "REGULATION",
  railwayTrackInfrastructure: "RAILWAY_TRACK_INFRASTRUCTURE",
  railwayOperationalSystems: "RAILWAY_OPERATIONAL_SYSTEMS",
  railwayFacilitiesAndStations: "RAILWAY_FACILITIES_AND_STATIONS",
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/projects/${typeId}/details/${id}`;

  return [
    {
      id: projectMenuIds.projectSetup,
      title: "project.navigation.menu.project-setup",
      path: `${baseUrl}/project-setup`,
    },
    {
      id: projectMenuIds.resource,
      title: "project.navigation.menu.resource",
      path: `${baseUrl}/resource`,
    },
    {
      id: projectMenuIds.reporting,
      title: "project.navigation.menu.reporting",
      path: `${baseUrl}/reporting`,
    },
    {
      id: projectMenuIds.segment,
      title: "project.navigation.menu.segment",
      path: `${baseUrl}/segment`,
      type: projectTypesMaster.road,
    },
    {
      id: projectMenuIds.feature,
      title: "project.navigation.menu.feature",
      path: `${baseUrl}/feature`,
      type: projectTypesMaster.road,
    },
    {
      id: projectMenuIds.maintenance,
      title: "project.navigation.menu.maintenance",
      path: `${baseUrl}/maintenance`,
      type: projectTypesMaster.road,
    },
    {
      id: projectMenuIds.telecomInfrastructure,
      title: "project.navigation.menu.telecom-infrastructure",
      path: `${baseUrl}/telecom-infrastructure`,
      type: projectTypesMaster.telecommunication,
    },
    {
      id: projectMenuIds.mobileSatelliteNetworks,
      title: "project.navigation.menu.mobile-satellite-networks",
      path: `${baseUrl}/mobile-satellite-networks`,
      type: projectTypesMaster.telecommunication,
    },
    {
      id: projectMenuIds.broadcastingDataSystems,
      title: "project.navigation.menu.broadcasting-data-systems",
      path: `${baseUrl}/broadcasting-data-systems`,
      type: projectTypesMaster.telecommunication,
    },
    {
      id: projectMenuIds.powerGeneration,
      title: "project.navigation.menu.power-generation",
      path: `${baseUrl}/power-generation`,
      type: projectTypesMaster.eletric,
    },
    {
      id: projectMenuIds.powerInfrastructure,
      title: "project.navigation.menu.power-infrastructure",
      path: `${baseUrl}/power-infrastructure`,
      type: projectTypesMaster.eletric,
    },
    {
      id: projectMenuIds.regulation,
      title: "project.navigation.menu.regulation",
      path: `${baseUrl}/regulation`,
      type: projectTypesMaster.eletric,
    },
    {
      id: projectMenuIds.railwayTrackInfrastructure,
      title: "project.navigation.menu.railway-track-infrastructure",
      path: `${baseUrl}/railway-track-infrastructure`,
      type: projectTypesMaster.railway,
    },
    {
      id: projectMenuIds.railwayOperationalSystems,
      title: "project.navigation.menu.railway-operational-systems",
      path: `${baseUrl}/railway-operational-systems`,
      type: projectTypesMaster.railway,
    },
    {
      id: projectMenuIds.railwayFacilitiesAndStations,
      title: "project.navigation.menu.railway-facilities-and-stations",
      path: `${baseUrl}/railway-facilities-and-stations`,
      type: projectTypesMaster.railway,
    },
  ];
};
export const projectTypesMaster = {
  building: "BUILDING",
  airfieldAirport: "AIRFILED_AIRPORT",
  railway: "RAILWAY",
  telecommunication: "TELECOMMUNICATION",
  road: "ROAD",
  waterInfrastructure: "WATER_INFRASTRUCTURE",
  eletric: "ELECTRIC",
};
export type ProjectMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
