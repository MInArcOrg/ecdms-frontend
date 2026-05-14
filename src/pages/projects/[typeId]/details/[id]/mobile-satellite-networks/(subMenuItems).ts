import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const mobileSatelliteNetworksId = {
  mobileNetworks: {
    mobileNetworks: 'MOBILE_NETWORKS',
    mobileNetwork: 'MOBILE_NETWORK',
    ageOfMobileNetworkComponents: 'AGE_OF_MOBILE_NETWORK_COMPONENTS',
    manufacturerOfMobileNetworkComponents: 'MANUFACTURER_OF_MOBILE_NETWORK_COMPONENTS',
    networkCapacity: 'NETWORK_CAPACITY',
    networkCoverage: 'NETWORK_COVERAGE'
  },
  satelliteNetworks: {
    satelliteNetworks: 'SATELLITE_NETWORKS',
    satelliteNetwork: 'SATELLITE_NETWORK',
    ageOfSatelliteNetworkComponents: 'AGE_OF_SATELLITE_NETWORK_COMPONENTS',
    manufacturerOfSatelliteNetworkComponents: 'MANUFACTURER_OF_SATELLITE_NETWORK_COMPONENTS',
    networkCapacity: 'SATELLITE_NETWORK_CAPACITY',
    networkCoverage: 'SATELLITE_NETWORK_COVERAGE'
  }
};

const subMenuItems = (id: string, typeId: string, module: string = "projects"): DetailSubMenuItem[] => [
  {
    id: mobileSatelliteNetworksId.mobileNetworks.mobileNetworks,
    title: 'project.navigation.submenu.mobile-satellite.mobile-networks.title',
    subItems: [
      {
        id: mobileSatelliteNetworksId.mobileNetworks.mobileNetwork,
        title: 'project.navigation.submenu.mobile-satellite.mobile-networks.mobile-network',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/mobile-networks/mobile-network`,
        model: 'mobilenetwork',
        apiRoute: 'mobile-networks'
      },
      {
        id: mobileSatelliteNetworksId.mobileNetworks.ageOfMobileNetworkComponents,
        title: 'project.navigation.submenu.mobile-satellite.mobile-networks.age-of-mobile-network-components',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/mobile-networks/age-of-mobile-network-components`,
        model: 'mobilenetworkcomponentage',
        apiRoute: 'mobile-network-component-ages'
      },
      {
        id: mobileSatelliteNetworksId.mobileNetworks.manufacturerOfMobileNetworkComponents,
        title: 'project.navigation.submenu.mobile-satellite.mobile-networks.manufacturer-of-mobile-network-components',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/mobile-networks/manufacturer-of-mobile-network-components`,
        model: 'mobilenetworkcomponentmanufacturer',
        apiRoute: 'mobile-network-component-manufacturers'
      },
      {
        id: mobileSatelliteNetworksId.mobileNetworks.networkCapacity,
        title: 'project.navigation.submenu.mobile-satellite.mobile-networks.network-capacity',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/mobile-networks/mobile-network-capacity`,
        model: 'mobilenetworkcapacity',
        apiRoute: 'mobile-network-capacities'
      },
      {
        id: mobileSatelliteNetworksId.mobileNetworks.networkCoverage,
        title: 'project.navigation.submenu.mobile-satellite.mobile-networks.network-coverage',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/mobile-networks/mobile-network-coverage`,
        model: 'mobilenetworkcoverage',
        apiRoute: 'mobile-network-coverages'
      }
    ]
  },
  {
    id: mobileSatelliteNetworksId.satelliteNetworks.satelliteNetworks,
    title: 'project.navigation.submenu.mobile-satellite.satellite-networks.title',
    subItems: [
      {
        id: mobileSatelliteNetworksId.satelliteNetworks.satelliteNetwork,
        title: 'project.navigation.submenu.mobile-satellite.satellite-networks.satellite-network',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/satellite-networks/satellite-network`,
        model: 'satellitenetwork',
        apiRoute: 'satellite-networks'
      },
      {
        id: mobileSatelliteNetworksId.satelliteNetworks.ageOfSatelliteNetworkComponents,
        title: 'project.navigation.submenu.mobile-satellite.satellite-networks.age-of-satellite-network-components',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/satellite-networks/age-of-satellite-network-components`,
        model: 'satellitenetworkcomponentage',
        apiRoute: 'satellite-network-component-ages'
      },
      {
        id: mobileSatelliteNetworksId.satelliteNetworks.manufacturerOfSatelliteNetworkComponents,
        title: 'project.navigation.submenu.mobile-satellite.satellite-networks.manufacturer-of-satellite-network-components',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/satellite-networks/manufacturer-of-satellite-network-components`,
        model: 'satellitenetworkcomponentmanufacturer',
        apiRoute: 'satellite-network-component-manufacturers'
      },
      {
        id: mobileSatelliteNetworksId.satelliteNetworks.networkCapacity,
        title: 'project.navigation.submenu.mobile-satellite.satellite-networks.network-capacity',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/satellite-networks/network-capacity`,
        model: 'satellitenetworkcapacity',
        apiRoute: 'satellite-network-capacities'
      },
      {
        id: mobileSatelliteNetworksId.satelliteNetworks.networkCoverage,
        title: 'project.navigation.submenu.mobile-satellite.satellite-networks.network-coverage',
        path: `/${module}/${typeId}/details/${id}/mobile-satellite-networks/satellite-networks/network-coverage`,
        model: 'satellitenetworkcoverage',
        apiRoute: 'satellite-network-coverages'
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