import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const powerGenerationIds = {
  hydropower: {
    hydropower: 'HYDROPOWER',
    hydroelectricDam: 'HYDROELECTRIC_DAM',
    hydrologicalInformation: 'HYDROLOGICAL_INFORMATION'
  },
  windEnergy: {
    windEnergy: 'WIND_ENERGY',
    windResource: 'WIND_RESOURCE',
    windTurbine: 'WIND_TURBINE'
  },
  solarEnergy: {
    solarEnergy: 'SOLAR_ENERGY',
    solarResourceInformation: 'SOLAR_RESOURCE_INFORMATION',
    solarPanel: 'SOLAR_PANEL'
  },
  geothermalEnergy: {
    geothermalEnergy: 'GEOTHERMAL_ENERGY',
    geothermalPowerWells: 'GEOTHERMAL_POWER_WELLS',
    geothermalPowerInfrastructure: 'GEOTHERMAL_POWER_INFRASTRUCTURE'
  },
  thermalBiomass: {
    thermalBiomass: 'THERMAL_BIOMASS',
    thermalBiomassIncinerationData: 'THERMAL_BIOMASS_INCINERATION_DATA'
  },
  capacity: {
    capacity: 'CAPACITY',
    powerGenerationCapacity: 'POWER_GENERATION_CAPACITY'
  }
};

const subMenuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: powerGenerationIds.hydropower.hydropower,
    title: 'project.navigation.submenu.power-generation.hydropower.title',
    subItems: [
      {
        id: powerGenerationIds.hydropower.hydroelectricDam,
        title: 'project.navigation.submenu.power-generation.hydropower.hydroelectric-dam',
        path: `/projects/${typeId}/details/${id}/power-generation/hydropower/hydroelectric-dam`,
        model: 'hydroelectricdam',
        apiRoute: 'hydroelectricdams'
      },
      {
        id: powerGenerationIds.hydropower.hydrologicalInformation,
        title: 'project.navigation.submenu.power-generation.hydropower.hydrological-information',
        path: `/projects/${typeId}/details/${id}/power-generation/hydropower/hydrological-information`,
        model: 'hydrologicalinformation',
        apiRoute: 'hydrological-informations'
      }
    ]
  },
  {
    id: powerGenerationIds.windEnergy.windEnergy,
    title: 'project.navigation.submenu.power-generation.wind-energy.title',
    subItems: [
      {
        id: powerGenerationIds.windEnergy.windResource,
        title: 'project.navigation.submenu.power-generation.wind-energy.wind-resource',
        path: `/projects/${typeId}/details/${id}/power-generation/wind-energy/wind-resource`,
        model: 'windresource',
        apiRoute: 'wind-resources'
      },
      {
        id: powerGenerationIds.windEnergy.windTurbine,
        title: 'project.navigation.submenu.power-generation.wind-energy.wind-turbine',
        path: `/projects/${typeId}/details/${id}/power-generation/wind-energy/wind-turbine`,
        model: 'windturbine',
        apiRoute: 'wind-turbines'
      }
    ]
  },
  {
    id: powerGenerationIds.solarEnergy.solarEnergy,
    title: 'project.navigation.submenu.power-generation.solar-energy.title',
    subItems: [
      {
        id: powerGenerationIds.solarEnergy.solarResourceInformation,
        title: 'project.navigation.submenu.power-generation.solar-energy.solar-resource-information',
        path: `/projects/${typeId}/details/${id}/power-generation/solar-energy/solar-resource-information`,
        model: 'solarresourceinformation',
        apiRoute: 'solar-resource-informations'
      },
      {
        id: powerGenerationIds.solarEnergy.solarPanel,
        title: 'project.navigation.submenu.power-generation.solar-energy.solar-panel',
        path: `/projects/${typeId}/details/${id}/power-generation/solar-energy/solar-panel`,
        model: 'solarpanel',
        apiRoute: 'solar-panels'
      }
    ]
  },
  {
    id: powerGenerationIds.geothermalEnergy.geothermalEnergy,
    title: 'project.navigation.submenu.power-generation.geothermal-energy.title',
    subItems: [
      {
        id: powerGenerationIds.geothermalEnergy.geothermalPowerWells,
        title: 'project.navigation.submenu.power-generation.geothermal-energy.geothermal-power-wells',
        path: `/projects/${typeId}/details/${id}/power-generation/geothermal-energy/geothermal-power-wells`,
        model: 'geothermalpowerwell',
        apiRoute: 'geothermal-power-wells'
      },
      {
        id: powerGenerationIds.geothermalEnergy.geothermalPowerInfrastructure,
        title: 'project.navigation.submenu.power-generation.geothermal-energy.geothermal-power-infrastructure',
        path: `/projects/${typeId}/details/${id}/power-generation/geothermal-energy/geothermal-power-infrastructure`,
        model: 'geothermalpowerinfrastructure',
        apiRoute: 'geothermal-power-infrastructures'
      }
    ]
  },
  {
    id: powerGenerationIds.thermalBiomass.thermalBiomass,
    title: 'project.navigation.submenu.power-generation.thermal-biomass.title',
    subItems: [
      {
        id: powerGenerationIds.thermalBiomass.thermalBiomassIncinerationData,
        title: 'project.navigation.submenu.power-generation.thermal-biomass.thermal-biomass-incineration-data',
        path: `/projects/${typeId}/details/${id}/power-generation/thermal-biomass/thermal-biomass-incineration-data`,
        model: 'thermalbiomassincinerationdata',
        apiRoute: 'thermal-biomass-incineration-data'
      }
    ]
  },
  {
    id: powerGenerationIds.capacity.capacity,
    title: 'project.navigation.submenu.power-generation.capacity.title',
    subItems: [
      {
        id: powerGenerationIds.capacity.powerGenerationCapacity,
        title: 'project.navigation.submenu.power-generation.capacity.power-generation-capacity',
        path: `/projects/${typeId}/details/${id}/power-generation/capacity/power-generation-capacity`,
        model: 'powergenerationcapacity',
        apiRoute: 'power-generation-capacities'
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
