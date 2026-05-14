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
    railwayPowerSupplyEnvironmentalAndOtherFactors: 'RAILWAY_POWER_SUPPLY_ENVIRONMENTAL_AND_OTHER_FACTOR'
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
        model: 'railwaysignalingsystem',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommunicationSystem,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-communication-system',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-communication-system`,
        apiRoute: 'railway-communication-systems',
        model: 'railwaycommunicationsystem',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwaySystemConditionAssessment,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-system-condition-assessment',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-system-condition-assessment`,
        apiRoute: 'railway-system-condition-assessments',
        model: 'railwaysystemconditionassessment',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemMaintenanceAndTesting,
        title:
          'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-comm-system-maintenance-and-testing',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-comm-system-maintenance-and-testing`,
        apiRoute: 'railway-communication-system-maintenance-and-testings',
        model: 'railwaycommunicationsystemmaintenanceandtesting',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayCommSystemSafetyAndCompliance,
        title:
          'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-comm-system-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-comm-system-safety-and-compliance`,
        model: 'railwaycommunicationsystemsafetyandcompliance',
        apiRoute: 'railway-communication-system-safety-and-compliances',
        fileType: railwayOperationalSystemsIds.communicationAndSignaling.id
      },
      {
        id: railwayOperationalSystemsIds.communicationAndSignaling.railwayEnvironmentalAndOtherFactors,
        title: 'project.navigation.submenu.railway-operational-systems.communication-and-signaling.railway-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/communication-and-signaling/railway-environmental-and-other-factors`,
        apiRoute: 'railway-environmental-and-other-factors',
        model: 'railwayenvironmentalandotherfactors'
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
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-identification`,
        apiRoute: 'railway-vehicle-identifications',
        model: 'railwayvehicleidentification',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleSpecifications,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-specifications',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-specifications`,
        apiRoute: 'railway-vehicle-specifications',
        model: 'railwayvehiclespecification',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleMaintenanceAndInspection,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-maintenance-and-inspection',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-maintenance-and-inspection`,
        apiRoute: 'railway-vehicle-maintenance-and-inspections',
        model: 'railwayvehiclemaintenanceandinspection',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleOperationalPerformance,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-operational-performance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-operational-performance`,
        apiRoute: 'railway-vehicle-operational-performances',
        model: 'railwayvehicleoperationalperformance',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleSafetyAndCompliance,
        title: 'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-safety-and-compliance`,
        apiRoute: 'railway-vehicle-safety-and-compliances',
        model: 'railwayvehiclesafetyandcompliance',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleInteriorAndPassengerAmenities,
        title:
          'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-interior-and-passenger-amenities',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-interior-and-passenger-amenities`,
        apiRoute: 'railway-vehicle-interior-and-passenger-amenities',
        model: 'railwayvehicleinteriorandpassengeramenity',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
      },
      {
        id: railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleLoadAndCargoSpecifications,
        title:
          'project.navigation.submenu.railway-operational-systems.rolling-stock-vehicles.railway-vehicle-load-and-cargo-specifications',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/rolling-stock-vehicles/railway-vehicle-load-and-cargo-specifications`,
        apiRoute: 'railway-vehicle-load-and-cargo-specifications',
        model: 'railwayvehicleloadandcargospecification',
        fileType: railwayOperationalSystemsIds.rollingStockVehicles.id
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
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-configuration`,
        apiRoute: 'railway-power-supply-configurations',
        model: 'railwaypowersupplyconfiguration',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyConfiguration
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-substations-and-equipment',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-substations-and-equipment`,
        apiRoute: 'railway-power-substations-and-equipments',
        model: 'railwaypowersubstationandequipment',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-distribution',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-distribution`,
        apiRoute: 'railway-power-distributions',
        model: 'railwaypowerdistribution',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-maintenance-and-testing',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-maintenance-and-testing`,
        apiRoute: 'railway-power-supply-maintenance-and-testings',
        model: 'railwaypowersupplymaintenanceandtesting',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyMaintenanceAndTesting
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-safety-and-compliance',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-safety-and-compliance`,
        apiRoute: 'railway-power-supply-safety-and-compliances',
        model: 'railwaypowersupplysafetyandcompliance',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance
      },
      {
        id: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors,
        title: 'project.navigation.submenu.railway-operational-systems.power-systems.railway-power-supply-environmental-and-other-factors',
        path: `/projects/${typeId}/details/${id}/railway-operational-systems/power-systems/railway-power-supply-environmental-and-other-factors`,
        apiRoute: 'railway-power-supply-environmental-and-other-factors',
        model: 'railwaypowersupplyenvironmentalandotherfactor',
        fileType: railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors
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
