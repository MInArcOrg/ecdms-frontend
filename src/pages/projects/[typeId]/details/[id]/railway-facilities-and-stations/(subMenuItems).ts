import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

export const railwayFacilitiesAndStationsIds = {
  stations_and_platforms: {
    id: 'STATIONS_AND_PLATFORMS',
    station_platform_layout: 'STATION_PLATFORM_LAYOUT',
    station_platform_facilities: 'STATION_PLATFORM_FACILITIES',
    station_platform_structural_elements: 'STATION_PLATFORM_STRUCTURAL_ELEMENTS',
    station_platform_signage_and_wayfinding: 'STATION_PLATFORM_SIGNAGE_AND_WAYFINDING',
    station_platform_safety_and_security: 'STATION_PLATFORM_SAFETY_AND_SECURITY',
    station_platform_surface_and_finishes: 'STATION_PLATFORM_SURFACE_AND_FINISHES',
    station_platform_passenger_flow_and_capacity: 'STATION_PLATFORM_PASSENGER_FLOW_AND_CAPACITY',
    station_platform_environmental_and_other_factors: 'STATION_PLATFORM_ENVIRONMENTAL_AND_OTHER_FACTORS'
  },
  maintenance_facilities: {
    id: 'MAINTENANCE_FACILITIES',
    maintenance_facility_type_and_purpose: 'MAINTENANCE_FACILITY_TYPE_AND_PURPOSE',
    maintenance_facility_layout_and_design: 'MAINTENANCE_FACILITY_LAYOUT_AND_DESIGN',
    maintenance_facility_equipment_and_tools: 'MAINTENANCE_FACILITY_EQUIPMENT_AND_TOOLS',
    maintenance_facility_infrastructure_and_utilities: 'MAINTENANCE_FACILITY_INFRASTRUCTURE_AND_UTILITIES',
    maintenance_facility_workforce_and_staff: 'MAINTENANCE_FACILITY_WORKFORCE_AND_STAFF',
    maintenance_facility_schedules_and_procedures: 'MAINTENANCE_FACILITY_SCHEDULES_AND_PROCEDURES',
    maintenance_facility_safety_and_security: 'MAINTENANCE_FACILITY_SAFETY_AND_SECURITY',
    maintenance_facility_environmental_and_other_factors: 'MAINTENANCE_FACILITY_ENVIRONMENTAL_AND_OTHER_FACTORS'
  }
};

export const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: railwayFacilitiesAndStationsIds.stations_and_platforms.id,
    title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.title',
    subItems: [
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_layout,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-layout',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-layout`,
        model: 'stationplatformlayout'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_facilities,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-facilities',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-facilities`,
        model: 'stationplatformfacility'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_structural_elements,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-structural-elements',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-structural-elements`,
        model: 'stationplatformstructurelelement'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_signage_and_wayfinding,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-signage-and-wayfinding',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-signage-and-wayfinding`,
        model: 'stationplatformsignageandwayfinding'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_safety_and_security,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-safety-and-security',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-safety-and-security`,
        model: 'stationplatformsafetyandsecurity'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_surface_and_finishes,
        title: 'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-surface-and-finishes',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-surface-and-finishes`,
        model: 'stationplatformsurfaceandfinish'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_passenger_flow_and_capacity,
        title:
          'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-passenger-flow-and-capacity',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-passenger-flow-and-capacity`,
        model: 'stationplatformpassengerflowandcapacity'
      },
      {
        id: railwayFacilitiesAndStationsIds.stations_and_platforms.station_platform_environmental_and_other_factors,
        title:
          'project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-environmental-and-other-factors`,
        model: 'stationplatformenvironmentalandotherfactor'
      }
    ]
  },
  {
    id: railwayFacilitiesAndStationsIds.maintenance_facilities.id,
    title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.title',
    subItems: [
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_type_and_purpose,
        title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-type-and-purpose',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-type-and-purpose`,
        model: 'maintenancefacilitytypeandpurpose'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_layout_and_design,
        title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-layout-and-design',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-layout-and-design`,
        model: 'maintenancefacilitylayoutanddesign'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_equipment_and_tools,
        title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-equipment-and-tools',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-equipment-and-tools`,
        model: 'maintenancefacilityequipmentandtool' //TODO: add
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_infrastructure_and_utilities,
        title:
          'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-infrastructure-and-utilities',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-infrastructure-and-utilities`,
        model: 'maintenancefacilityinfrastructureandutility'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_workforce_and_staff,
        title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-workforce-and-staff',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-workforce-and-staff`,
        model: 'maintenancefacilityworkforceandstaff'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_schedules_and_procedures,
        title:
          'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-schedules-and-procedures',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-schedules-and-procedures`,
        model: 'maintenancefacilityscheduleandprocedure'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_safety_and_security,
        title: 'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-safety-and-security',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-safety-and-security`,
        model: 'maintenancefacilitysafetyandsecurity'
      },
      {
        id: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_environmental_and_other_factors,
        title:
          'project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-environmental-and-other-factors`,
        model: 'maintenancefacilityenvironmentalandotherfactor'
      }
    ]
  }
];
export const findSubMenuItem = (items: DetailSubMenuItem[], id: string) => {
  for (const item of items) {
    if (item.subItems) {
      for (const subItem of item.subItems) {
        if (subItem.id === id) return subItem;
      }
    }
  }
  return undefined;
};
export default subMenuItems;
