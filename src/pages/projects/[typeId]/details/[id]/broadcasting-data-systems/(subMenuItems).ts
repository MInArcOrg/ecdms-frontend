import { DetailSubMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const broadcastingDataSystemsId = {
  broadcasting: {
    broadcasting: "BROADCASTING",
    broadcastingInfrastructure: "BROADCASTING_INFRASTRUCTURE",
    ageOfBroadcastingInfrastructure: "AGE_OF_BROADCASTING_INFRASTRUCTURE",
    manufacturerOfBroadcastingInfrastructure:
      "MANUFACTURER_OF_BROADCASTING_INFRASTRUCTURE",
    networkCapacity: "BROADCASTING_NETWORK_CAPACITY",
    networkCoverage: "BROADCASTING_NETWORK_COVERAGE",
  },
  dataSystems: {
    dataSystems: "DATA_SYSTEMS",
    dataCenters: "DATA_CENTERS",
    ageOfDataCenterComponents: "AGE_OF_DATA_CENTER_COMPONENTS",
    manufacturerOfDataCenterComponents:
      "MANUFACTURER_OF_DATA_CENTER_COMPONENTS",
    dataCenterFacilityCapacity: "DATA_CENTER_FACILITY_CAPACITY",
    environmentalControl: "ENVIRONMENTAL_CONTROL",
  },
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: broadcastingDataSystemsId.broadcasting.broadcasting,
    title: "project.navigation.submenu.broadcasting-data.broadcasting.title",
    subItems: [
      {
        id: broadcastingDataSystemsId.broadcasting.broadcastingInfrastructure,
        title:
          "project.navigation.submenu.broadcasting-data.broadcasting.broadcasting-infrastructure",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/broadcasting/broadcasting-infrastructure`,
        model: "broadcastinginfrastructure",
        apiRoute: "broadcasting-infrastructures",
      },
      {
        id: broadcastingDataSystemsId.broadcasting
          .ageOfBroadcastingInfrastructure,
        title:
          "project.navigation.submenu.broadcasting-data.broadcasting.age-of-broadcasting-infrastructure",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/broadcasting/age-of-broadcasting-infrastructure`,
        model: "broadcastinginfrastructureage",
        apiRoute: "broadcasting-infrastructure-ages",
      },
      {
        id: broadcastingDataSystemsId.broadcasting
          .manufacturerOfBroadcastingInfrastructure,
        title:
          "project.navigation.submenu.broadcasting-data.broadcasting.manufacturer-of-broadcasting-infrastructure",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/broadcasting/manufacturer-of-broadcasting-infrastructure`,
        model: "broadcastinginfrastructuremanufacturer",
        apiRoute: "broadcasting-infrastructure-manufacturers",
      },
      {
        id: broadcastingDataSystemsId.broadcasting.networkCapacity,
        title:
          "project.navigation.submenu.broadcasting-data.broadcasting.network-capacity",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/broadcasting/network-capacity`,
        model: "broadcastingnetworkcapacity",
        apiRoute: "broadcasting-network-capacities",
      },
      {
        id: broadcastingDataSystemsId.broadcasting.networkCoverage,
        title:
          "project.navigation.submenu.broadcasting-data.broadcasting.network-coverage",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/broadcasting/network-coverage`,
        model: "broadcastingnetworkcoverage",
        apiRoute: "broadcasting-network-coverages",
      },
    ],
  },
  {
    id: broadcastingDataSystemsId.dataSystems.dataSystems,
    title: "project.navigation.submenu.broadcasting-data.data-systems.title",
    subItems: [
      {
        id: broadcastingDataSystemsId.dataSystems.dataCenters,
        title:
          "project.navigation.submenu.broadcasting-data.data-systems.data-centers",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/data-systems/data-centers`,
        model: "datacenter",
        apiRoute: "data-centers",
      },
      {
        id: broadcastingDataSystemsId.dataSystems.ageOfDataCenterComponents,
        title:
          "project.navigation.submenu.broadcasting-data.data-systems.age-of-data-center-components",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/data-systems/age-of-data-center-components`,
        model: "datacentercomponentage",
        apiRoute: "data-center-component-ages",
      },
      {
        id: broadcastingDataSystemsId.dataSystems
          .manufacturerOfDataCenterComponents,
        title:
          "project.navigation.submenu.broadcasting-data.data-systems.manufacturer-of-data-center-components",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/data-systems/manufacturer-of-data-center-components`,
        model: "datacentercomponentmanufacturer",
        apiRoute: "data-center-component-manufacturers",
      },
      {
        id: broadcastingDataSystemsId.dataSystems.dataCenterFacilityCapacity,
        title:
          "project.navigation.submenu.broadcasting-data.data-systems.data-center-facility-capacity",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/data-systems/data-center-facility-capacity`,
        model: "datacenterfacilitycapacity",
        apiRoute: "data-center-facility-capacities",
      },
      {
        id: broadcastingDataSystemsId.dataSystems.environmentalControl,
        title:
          "project.navigation.submenu.broadcasting-data.data-systems.environmental-control",
        path: `/projects/${typeId}/details/${id}/broadcasting-data-systems/data-systems/environmental-control`,
        model: "environmentalcontrol",
        apiRoute: "environmental-controls",
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
