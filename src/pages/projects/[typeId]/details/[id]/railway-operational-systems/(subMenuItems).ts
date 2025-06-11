import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

export const railwayOperationalSystemsIds = {
  communicationAndSignaling: {
    id: 'COMMUNICATION_AND_SIGNALING',
    railwaySignalingSystem: 'RAILWAY_SIGNALING_SYSTEM',
    railwayCommunicationSystem: 'RAILWAY_COMMUNICATION_SYSTEM',
    railwaySystemConditionAssessment: 'RAILWAY_SYSTEM_CONDITION_ASSESSMENT',
    railwayCommSystemMaintenanceAndTesting: 'RAILWAY_COMM_SYSTEM_MAINTENANCE_AND_TESTING',
    railwayCommSystemSafetyAndCompliance: 'RAILWAY_COMM_SYSTEM_SAFETY_AND_COMPLIANCE',
    railwayEnvironmentalAndOtherFactors: 'RAILWAY_ENVIRONMENTAL_AND_OTHER_FACTORS'
  },
  rollingStockVehicles: {
    id: 'ROLLING_STOCK_VEHICLES',
    railwayVehicleIdentification: 'RAILWAY_VEHICLE_IDENTIFICATION',
    railwayVehicleSpecifications: 'RAILWAY_VEHICLE_SPECIFICATIONS',
    railwayVehicleMaintenanceAndInspection: 'RAILWAY_VEHICLE_MAINTENANCE_AND_INSPECTION',
    railwayVehicleOperationalPerformance: 'RAILWAY_VEHICLE_OPERATIONAL_PERFORMANCE',
    railwayVehicleSafetyAndCompliance: 'RAILWAY_VEHICLE_SAFETY_AND_COMPLIANCE',
    railwayVehicleInteriorAndPassengerAmenities: 'RAILWAY_VEHICLE_INTERIOR_AND_PASSENGER_AMENITIES',
    railwayVehicleLoadAndCargoSpecifications: 'RAILWAY_VEHICLE_LOAD_AND_CARGO_SPECIFICATIONS'
  },
  powerSystems: {
    id: 'POWER_SYSTEMS',
    railwayPowerSupplyConfiguration: 'RAILWAY_POWER_SUPPLY_CONFIGURATION',
    railwayPowerSubstationsAndEquipment: 'RAILWAY_POWER_SUBSTATIONS_AND_EQUIPMENT',
    railwayPowerDistribution: 'RAILWAY_POWER_DISTRIBUTION',
    railwayPowerSupplyMaintenanceAndTesting: 'RAILWAY_POWER_SUPPLY_MAINTENANCE_AND_TESTING',
    railwayPowerSupplySafetyAndCompliance: 'RAILWAY_POWER_SUPPLY_SAFETY_AND_COMPLIANCE',
    railwayPowerSupplyEnvironmentalAndOtherFactors: 'RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTORS'
  }
};

export const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: railwayOperationalSystemsIds.communicationAndSignaling.id,
    title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.title',
    subItems: [
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwaySignalingSystem,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-signaling-system',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-signaling-system`,
        apiRoute: 'railway-signaling-systems',
        model: 'railwaysignaling',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-communication-system',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-communication-system`
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwaySystemConditionAssessment,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-system-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-system-condition-assessment`
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemMaintenanceAndTesting,
        title:
          'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-comm-system-maintenance-and-testing',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-comm-system-maintenance-and-testing`
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemSafetyAndCompliance,
        title:
          'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-comm-system-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-comm-system-safety-and-compliance`
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayEnvironmentalAndOtherFactors,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-environmental-and-other-factors`
      }
    ]
  },
  {
    id: railwayOperationalSystemsIds.rollingStockVehicles.id,
    title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.title',
    subItems: [
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleIdentification,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-identification',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-identification`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleSpecifications,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-specifications',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-specifications`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleMaintenanceAndInspection,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-maintenance-and-inspection',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-maintenance-and-inspection`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleOperationalPerformance,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-operational-performance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-operational-performance`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleSafetyAndCompliance,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-safety-and-compliance`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleInteriorAndPassengerAmenities,
        title:
          'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-interior-and-passenger-amenities',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-interior-and-passenger-amenities`
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleLoadAndCargoSpecifications,
        title:
          'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-load-and-cargo-specifications',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-load-and-cargo-specifications`
      }
    ]
  },
  {
    id: railwayOperationalSystemsIds.powerSystems.id,
    title: 'project.navigation.submenu.railway-operational-systems.power-systems.title',
    subItems: [
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyConfiguration,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-configuration',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-configuration`
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-substations-and-equipment',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-substations-and-equipment`
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-distribution',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-distribution`
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-maintenance-and-testing',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-maintenance-and-testing`
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-safety-and-compliance`
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-environmental-and-other-factors`
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
