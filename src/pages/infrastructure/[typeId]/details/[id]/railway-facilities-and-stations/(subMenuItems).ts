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

export const subMenuItems = (
  id: string,
  typeId: string,
): DetailSubMenuItem[] => [
    {
      id: railwayFacilitiesAndStationsIds.stations_and_platforms.id,
      title:
        "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.title",
      subItems: [
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_layout,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-layout",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-layout`,
          model: "railwaystationplatformlayout",
          fileType: railwayFacilitiesAndStationsIds.stations_and_platforms.id,
          apiRoute: "railway-station-platform-layouts",
        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_facilities,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-facilities",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-facilities`,
          model: "railwaystationplatformfacility",
          fileType: railwayFacilitiesAndStationsIds.stations_and_platforms.id,
          apiRoute: "railway-station-platform-facilities",

        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_structural_elements,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-structural-elements",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-structural-elements`,
          model: "railwaystationplatformstructuralelement",
          fileType:
            railwayFacilitiesAndStationsIds.stations_and_platforms
              .station_platform_structural_elements,
          apiRoute: "railway-station-platform-structural-elements",

        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_signage_and_wayfinding,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-signage-and-wayfinding",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-signage-and-wayfinding`,
          fileType:
            railwayFacilitiesAndStationsIds.stations_and_platforms
              .station_platform_signage_and_wayfinding,
          model: "railwaystationplatformsignageandwayfinding",
          apiRoute: "railway-station-platform-signage-and-way-findings",
        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_safety_and_security,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-safety-and-security",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-safety-and-security`,
          model: "railwaystationplatformsafetyandsecurity",
          fileType:
            railwayFacilitiesAndStationsIds.stations_and_platforms
              .station_platform_safety_and_security,
          apiRoute: "railway-station-platform-safety-and-securities",
        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_surface_and_finishes,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-surface-and-finishes",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-surface-and-finishes`,
          model: "railwaystationplatformsurfaceandfinish",
          apiRoute: "railway-station-platform-surface-and-finishes",
          fileType: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_surface_and_finishes,
        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_passenger_flow_and_capacity,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-passenger-flow-and-capacity",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-passenger-flow-and-capacity`,
          model: "railwaystationplatformpassengerflowandcapacity",
          apiRoute: "railway-station-platform-passenger-flow-and-capacities",
          fileType: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_passenger_flow_and_capacity,
        },
        {
          id: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_environmental_and_other_factors,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.stations-and-platforms.station-platform-environmental-and-other-factors",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/stations-and-platforms/station-platform-environmental-and-other-factors`,
          model: "railwaystationplatformenvironmentalandotherfactor",
          apiRoute: "railway-station-platform-environmental-and-other-factors",
          fileType: railwayFacilitiesAndStationsIds.stations_and_platforms
            .station_platform_environmental_and_other_factors,
        },
      ],
    },
    {
      id: railwayFacilitiesAndStationsIds.maintenance_facilities.id,
      title:
        "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.title",
      subItems: [
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_type_and_purpose,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-type-and-purpose",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-type-and-purpose`,
          model: "railwaymaintenancefacilitytypeandpurpose",
          apiRoute: "railway-maintenance-facility-type-and-purposes",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_type_and_purpose,
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_layout_and_design,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-layout-and-design",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-layout-and-design`,
          model: "railwaymaintenancefacilitylayoutanddesign",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_layout_and_design,
          apiRoute: "railway-maintenance-facility-layout-and-designs",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_equipment_and_tools,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-equipment-and-tools",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-equipment-and-tools`,
          model: "railwaymaintenancefacilityequipmentandtool",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_equipment_and_tools,
          apiRoute: "railway-maintenance-facility-equipment-and-tools",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_infrastructure_and_utilities,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-infrastructure-and-utilities",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-infrastructure-and-utilities`,
          model: "railwaymaintenancefacilityinfrastructureandutility",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_infrastructure_and_utilities,
          apiRoute: "railway-maintenance-facility-infrastructure-and-utilities",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_workforce_and_staff,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-workforce-and-staff",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-workforce-and-staff`,
          model: "railwaymaintenancefacilityworkforceandstaff",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_workforce_and_staff,
          apiRoute: "railway-maintenance-workforce-and-facility-staffs",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_schedules_and_procedures,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-schedules-and-procedures",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-schedules-and-procedures`,
          model: "railwaymaintenancefacilityscheduleandprocedure",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_schedules_and_procedures,
          apiRoute: "railway-maintenance-facility-schedule-and-procedures",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_safety_and_security,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-safety-and-security",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-safety-and-security`,
          model: "railwaymaintenancefacilityandsecurity",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_safety_and_security,
          apiRoute: "railway-maintenance-facility-and-securities",
        },
        {
          id: railwayFacilitiesAndStationsIds.maintenance_facilities
            .maintenance_facility_environmental_and_other_factors,
          title:
            "project.navigation.submenu.railway-facilities-and-stations.maintenance-facilities.maintenance-facility-environmental-and-other-factors",
          path: `/${module}/${typeId}/details/${id}/railway-facilities-and-stations/maintenance-facilities/maintenance-facility-environmental-and-other-factors`,
          model: "railwaymaintenanceenvironmentalandotherfactor",
          fileType: railwayFacilitiesAndStationsIds.maintenance_facilities.maintenance_facility_environmental_and_other_factors,
          apiRoute: "railway-maintenance-environmental-and-other-factors",
        },
      ],
    },
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
