import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const powerInfrastructureIds = {
  transmissionSystems: {
    transmissionSystems: 'TRANSMISSION_SYSTEMS',
    transmission: 'TRANSMISSION',
    transmissionLineInformation: 'TRANSMISSION_LINE_INFORMATION',
    transmissionLineConductorAndTowerData: 'TRANSMISSION_LINE_CONDUCTOR_AND_TOWER_DATA',
    transmissionLineEquipmentData: 'TRANSMISSION_LINE_EQUIPMENT_DATA',
    substationTransformerAndSwitchgearData: 'SUBSTATION_TRANSFORMER_AND_SWITCHGEAR_DATA',
    substationLayoutAndCommunicationData: 'SUBSTATION_LAYOUT_AND_COMMUNICATION_DATA'
  },
  miniGridSystems: {
    miniGridSystems: 'MINI_GRID_SYSTEMS',
    miniGridStation: 'MINI_GRID_STATION',
    miniGridStationDistributionLine: 'MINI_GRID_STATION_DISTRIBUTION_LINE',
    miniGridStationDistributionLineInfrastructure: 'MINI_GRID_STATION_DISTRIBUTION_LINE_INFRASTRUCTURE',
    miniGridStationConsumers: 'MINI_GRID_STATION_CONSUMERS',
    miniGridStationBackupPowerSource: 'MINI_GRID_STATION_BACKUP_POWER_SOURCE'
  },
  distributionSystems: {
    distributionSystems: 'DISTRIBUTION_SYSTEMS',
    electricDistributionTransformer: 'ELECTRIC_DISTRIBUTION_TRANSFORMER',
    electricDistributionTransformerType: 'ELECTRIC_DISTRIBUTION_TRANSFORMER_TYPE',
    electricSmartMetersData: 'ELECTRIC_SMART_METERS_DATA',
    electricSmartMetersRatingsData: 'ELECTRIC_SMART_METERS_RATINGS_DATA',
    electricSmartMetersPerformanceData: 'ELECTRIC_SMART_METERS_PERFORMANCE_DATA',
    electricSmartMetersPrivacyAndSecurityData: 'ELECTRIC_SMART_METERS_PRIVACY_AND_SECURITY_DATA'
  }
};

const subMenuItems = (id: string, typeId: string, module: string = "projects"): DetailSubMenuItem[] => [
  {
    id: powerInfrastructureIds.transmissionSystems.transmissionSystems,
    title: 'project.navigation.submenu.power-infrastructure.transmission-systems.title',
    subItems: [
      {
        id: powerInfrastructureIds.transmissionSystems.transmission,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.transmission',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/transmission`,
        model: 'transmission',
        apiRoute: 'transmissions',
        subject: 'transmission'
      },
      {
        id: powerInfrastructureIds.transmissionSystems.transmissionLineInformation,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.transmission-line-information',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/transmission-line-information`,
        model: 'transmissionlineinformation',
        apiRoute: 'transmission-line-informations'
      },
      {
        id: powerInfrastructureIds.transmissionSystems.transmissionLineConductorAndTowerData,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.transmission-line-conductor-and-tower-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/transmission-line-conductor-and-tower-data`,
        model: 'transmissionlineconductorandtowerdata',
        apiRoute: 'transmission-line-conductor-and-tower-datas'
      },
      {
        id: powerInfrastructureIds.transmissionSystems.transmissionLineEquipmentData,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.transmission-line-equipment-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/transmission-line-equipment-data`,
        model: 'transmissionlineequipmentdata',
        apiRoute: 'transmission-line-equipment-datas'
      },
      {
        id: powerInfrastructureIds.transmissionSystems.substationTransformerAndSwitchgearData,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.substation-transformer-and-switchgear-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/substation-transformer-and-switchgear-data`,
        model: 'substationtransformerandswitchgeardata',
        apiRoute: 'substation-transformer-and-switchgear-datas'
      },
      {
        id: powerInfrastructureIds.transmissionSystems.substationLayoutAndCommunicationData,
        title: 'project.navigation.submenu.power-infrastructure.transmission-systems.substation-layout-and-communication-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/transmission-systems/substation-layout-and-communication-data`,
        model: 'substationlayoutandcommunicationdata',
        apiRoute: 'substation-layout-and-communication-datas'
      }
    ]
  },
  {
    id: powerInfrastructureIds.miniGridSystems.miniGridSystems,
    title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.title',
    subItems: [
      {
        id: powerInfrastructureIds.miniGridSystems.miniGridStation,
        title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.mini-grid-station',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/mini-grid-systems/mini-grid-station`,
        model: 'minigridstation',
        apiRoute: 'mini-grid-stations'
      },
      {
        id: powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLine,
        title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.mini-grid-station-distribution-line',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/mini-grid-systems/mini-grid-station-distribution-line`,
        model: 'minigridstationdistributionline',
        apiRoute: 'mini-grid-station-distribution-lines'
      },
      {
        id: powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLineInfrastructure,
        title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.mini-grid-station-distribution-line-infrastructure',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/mini-grid-systems/mini-grid-station-distribution-line-infrastructure`,
        model: 'minigridstationdistributionlineinfrastructure',
        apiRoute: 'mini-grid-station-distribution-line-infrastructures'
      },
      {
        id: powerInfrastructureIds.miniGridSystems.miniGridStationConsumers,
        title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.mini-grid-station-consumers',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/mini-grid-systems/mini-grid-station-consumers`,
        model: 'minigridstationconsumer',
        apiRoute: 'mini-grid-station-consumers'
      },
      {
        id: powerInfrastructureIds.miniGridSystems.miniGridStationBackupPowerSource,
        title: 'project.navigation.submenu.power-infrastructure.mini-grid-systems.mini-grid-station-backup-power-source',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/mini-grid-systems/mini-grid-station-backup-power-source`,
        model: 'minigridstationbackuppowersource',
        apiRoute: 'mini-grid-station-backup-power-sources'
      }
    ]
  },
  {
    id: powerInfrastructureIds.distributionSystems.distributionSystems,
    title: 'project.navigation.submenu.power-infrastructure.distribution-systems.title',
    subItems: [
      {
        id: powerInfrastructureIds.distributionSystems.electricDistributionTransformer,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-distribution-transformer',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-distribution-transformer`,
        model: 'electricdistributiontransformer',
        apiRoute: 'electric-distribution-transformers'
      },
      {
        id: powerInfrastructureIds.distributionSystems.electricDistributionTransformerType,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-distribution-transformer-type',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-distribution-transformer-type`,
        model: 'electricdistributiontransformertype',
        apiRoute: 'electric-distribution-transformer-types'
      },
      {
        id: powerInfrastructureIds.distributionSystems.electricSmartMetersData,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-smart-meters-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-smart-meters-data`,
        model: 'electricsmartmetersdata',
        apiRoute: 'electric-smart-meters-data'
      },
      {
        id: powerInfrastructureIds.distributionSystems.electricSmartMetersRatingsData,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-smart-meters-ratings-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-smart-meters-ratings-data`,
        model: 'electricsmartmetersratingsdata',
        apiRoute: 'electric-smart-meters-ratings-data'
      },
      {
        id: powerInfrastructureIds.distributionSystems.electricSmartMetersPerformanceData,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-smart-meters-performance-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-smart-meters-performance-data`,
        model: 'electricsmartmetersperformancedata',
        apiRoute: 'electric-smart-meters-performance-data'
      },
      {
        id: powerInfrastructureIds.distributionSystems.electricSmartMetersPrivacyAndSecurityData,
        title: 'project.navigation.submenu.power-infrastructure.distribution-systems.electric-smart-meters-privacy-and-security-data',
        path: `/${module}/${typeId}/details/${id}/power-infrastructure/distribution-systems/electric-smart-meters-privacy-and-security-data`,
        model: 'electricsmartmetersprivacyandsecuritydata',
        apiRoute: 'electric-smart-meters-privacy-and-security-data'
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
