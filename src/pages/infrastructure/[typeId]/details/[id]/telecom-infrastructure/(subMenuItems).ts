import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const telecomInfrastructureId = {
  telecom: {
    telecom: 'TELECOM',
    telecomNetwork: 'TELECOM_NETWORK',
    telecomInfrastructureAge: 'TELECOM_INFRASTRUCTURE_AGE',
    telecomInfrastructureManufacturer: 'TELECOM_INFRASTRUCTURE_MANUFACTURER',
    networkCapacity: 'NETWORK_CAPACITY',
    networkCoverage: 'NETWORK_COVERAGE',
    maintenance: 'MAINTENANCE'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: telecomInfrastructureId.telecom.telecom,
    title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.title',
    subItems: [
      {
        id: telecomInfrastructureId.telecom.telecomNetwork,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.telecom-network',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/telecom-network`,
        model: 'telecomnetwork',
        apiRoute: 'telecom-networks'
      },
      {
        id: telecomInfrastructureId.telecom.telecomInfrastructureAge,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.telecom-infrastructure-age',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/telecom-infrastructure-age`,
        model: 'telecominfrastructureage',
        apiRoute: 'telecom-infrastructure-ages'
      },
      {
        id: telecomInfrastructureId.telecom.telecomInfrastructureManufacturer,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.telecom-infrastructure-manufacturer',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/telecom-infrastructure-manufacturer`,
        model: 'telecominfrastructuremanufacturer',
        apiRoute: 'telecom-infrastructure-manufacturers'
      },
      {
        id: telecomInfrastructureId.telecom.networkCapacity,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.network-capacity',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/network-capacity`,
        model: 'networkcapacity',
        apiRoute: 'network-capacities'
      },
      {
        id: telecomInfrastructureId.telecom.networkCoverage,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.network-coverage',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/network-coverage`,
        model: 'networkcoverage',
        apiRoute: 'network-coverages'
      },
      {
        id: telecomInfrastructureId.telecom.maintenance,
        title: 'project.navigation.submenu.telecom-infrastructure.telecom-infrastructure.maintenance',
        path: `/projects/${typeId}/details/${id}/telecom-infrastructure/telecom-infrastructure/maintenance`,
        model: 'maintenance',
        apiRoute: 'maintenances'
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
