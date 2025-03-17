import { useTranslation } from 'next-i18next';
export interface OtherMenuRoute {
  id: number;
  title: string;
  path: string;
  model: string;
  apiRoute: string; // Added apiRoute property
}

interface SubMenuItem {
  id: number;
  title: string;
  icon: string;
  routes: OtherMenuRoute[];
}

const useSubMenuItems = (baseUrl: string): SubMenuItem[] => {
  const { t } = useTranslation('common');

  return [
    {
      id: 1,
      title: t('project.navigation.submenu.others.building'),
      icon: 'mdi:office-building',
      routes: [
        {
          id: 1,
          title: t('project.navigation.submenu.others.building-dimensions-detail'),
          path: `${baseUrl}/building/building-dimension-detail`,
          model: 'buildingdimensiondetail',
          apiRoute: 'building-dimension-details'
        },
        {
          id: 2,
          title: t('project.navigation.submenu.others.building-envelop-material'),
          path: `${baseUrl}/building/building-envelop-material`,
          model: 'buildingenvelopmaterial',
          apiRoute: 'building-envelop-materials'
        }
      ]
    },
    {
      id: 2,
      title: t('project.navigation.submenu.others.road'),
      icon: 'mdi:road-variant',
      routes: [
        {
          id: 3,
          title: t('project.navigation.submenu.others.road-info'),
          path: `${baseUrl}/road/road-info`,
          model: 'roadinfo',
          apiRoute: 'road-infos'
        },
        {
          id: 4,
          title: t('project.navigation.submenu.others.road-segment'),
          path: `${baseUrl}/road/road-segment`,
          model: 'roadsegment',
          apiRoute: 'road-segments'
        },
        {
          id: 5,
          title: t('project.navigation.submenu.others.road-layer'),
          path: `${baseUrl}/road/road-layer`,
          model: 'roadlayer',
          apiRoute: 'road-layers'
        },
        {
          id: 23,
          title: t('project.navigation.submenu.others.drainage-assessment'),
          path: `${baseUrl}/road/drainage-assessment`,
          model: 'drainageassessment',
          apiRoute: 'drainage-assessments'
        },
        {
          id: 24,
          title: t('project.navigation.submenu.others.safety-and-health'),
          path: `${baseUrl}/road/safety-and-healths`,
          model: 'safetyandhealth',
          apiRoute: 'safety-and-healths'
        },
        {
          id: 25,
          title: t('project.navigation.submenu.others.maintenance-histories'),
          path: `${baseUrl}/road/maintenance-histories`,
          model: 'safetyandhealth',
          apiRoute: 'maintenance-histories'
        },
        {
          id: 26,
          title: t('project.navigation.submenu.others.road-surface-conditions'),
          path: `${baseUrl}/road/road-surface-conditions`,
          model: 'safetyandhealth',
          apiRoute: 'road-surface-conditions'
        },
        {
          id: 27,
          title: t('project.navigation.submenu.others.segment-geometry'),
          path: `${baseUrl}/road/segment-geometry`,
          model: 'segmentgeometry',
          apiRoute: 'segment-geometries'
        },
        {
          id: 28,
          title: t('project.navigation.submenu.others.intersection-driveway'),
          path: `${baseUrl}/road/intersection-driveway`,
          model: 'intersectiondriveway',
          apiRoute: 'intersection-and-driveways'
        },
        {
          id: 29,
          title: t('project.navigation.submenu.others.traffic-parameter'),
          path: `${baseUrl}/road/traffic-parameter`,
          model: 'trafficparameter',
          apiRoute: 'traffic-parameters'
        },
        {
          id: 30,
          title: t('project.navigation.submenu.others.accessory'),
          path: `${baseUrl}/road/accessory`,
          model: 'accessory',
          apiRoute: 'accessories'
        },
        {
          id: 31,
          title: t('project.navigation.submenu.others.pavement'),
          path: `${baseUrl}/road/pavement`,
          model: 'pavement',
          apiRoute: 'pavements'
        },
        {
          id: 32,
          title: t('project.navigation.submenu.others.culvert-basic-data'),
          path: `${baseUrl}/road/culvert-basic-data`,
          model: 'culvertbasicdata',
          apiRoute: 'culvert-basic-datas'
        },
        {
          id: 33,
          title: t('project.navigation.submenu.others.culvert-structural-information'),
          path: `${baseUrl}/road/culvert-structural-information`,
          model: 'culvertstructuralinformation',
          apiRoute: 'culvert-structural-informations'
        },
        {
          id: 34,
          title: t('project.navigation.submenu.others.culvert-road-over-information'),
          path: `${baseUrl}/road/culvert-road-over-information`,
          model: 'culvertroadoverinformation',
          apiRoute: 'culvert-road-over-informations'
        },
        {
          id: 34,
          title: t('project.navigation.submenu.others.bridge-basic-data'),
          path: `${baseUrl}/road/bridge-basic-data`,
          model: 'bridgebasicdata',
          apiRoute: 'bridge-basic-datas'
        },
        {
          id: 35,
          title: t('project.navigation.submenu.others.bridge-area-data'),
          path: `${baseUrl}/road/bridge-area-data`,
          model: 'bridgeareadata',
          apiRoute: 'bridge-area-datas'
        },
        {
          id: 36,
          title: t('project.navigation.submenu.others.bridge-super-structure'),
          path: `${baseUrl}/road/bridge-super-structure`,
          model: 'bridgesuperstructure',
          apiRoute: 'bridge-super-structures'
        },
        {
          id: 37,
          title: t('project.navigation.submenu.others.bridge-sub-structure'),
          path: `${baseUrl}/road/bridge-sub-structure`,
          model: 'bridgesubstructure',
          apiRoute: 'bridge-sub-structures'
        },
        {
          id: 38,
          title: t('project.navigation.submenu.others.bridge-foundation'),
          path: `${baseUrl}/road/bridge-foundation`,
          model: 'bridgefoundation',
          apiRoute: 'bridge-foundations'
        },
        {
          id: 39,
          title: t('project.navigation.submenu.others.bridge-inspection'),
          path: `${baseUrl}/road/bridge-inspection`,
          model: 'bridgeinspection',
          apiRoute: 'bridge-inspections'
        },
        {
          id: 40,
          title: t('project.navigation.submenu.others.bridge-structure-information'),
          path: `${baseUrl}/road/bridge-structure-information`,
          model: 'bridgestructureinformation',
          apiRoute: 'bridge-structure-informations'
        },
        {
          id: 41,
          title: t('project.navigation.submenu.others.traffic-volume'),
          path: `${baseUrl}/road/traffic-volume`,
          model: 'trafficvolume',
          apiRoute: 'traffic-volumes'
        },
        {
          id: 42,
          title: t('project.navigation.submenu.others.road-project-quality-control'),
          path: `${baseUrl}/road/road-project-quality-control`,
          model: 'roadprojectqualitycontrol',
          apiRoute: 'road-project-quality-controls'
        },
        {
          id: 43,
          title: t('project.navigation.submenu.others.road-drainage'),
          path: `${baseUrl}/road/road-drainage`,
          model: 'roaddrainage',
          apiRoute: 'road-drainages'
        },
        {
          id: 44,
          title: t('project.navigation.submenu.others.environmental-data'),
          path: `${baseUrl}/environmental/environmental-data`,
          model: 'environmentaldata',
          apiRoute: 'environmental-datas'
        },
        {
          id: 45,
          title: t('project.navigation.submenu.others.road-maintenance-data'),
          path: `${baseUrl}/road/road-maintenance-data`,
          model: 'roadmaintenancedata',
          apiRoute: 'road-maintenance-datas'
        },
        {
          id: 47,
          title: t('project.navigation.submenu.others.geotechnical-information'),
          path: `$baseUrl/geotechnical/geotechnical-information`,
          model: 'geotechnicalinformation',
          apiRoute: 'geotechnical-informations'
        },
        {
          id: 49,
          title: t("project.navigation.submenu.others.road-maintenance-activity"),
          path: `${baseUrl}/road/road-maintenance-activity`,
          model: "roadmaintenanceactivity",
          apiRoute: "road-maintenance-activities",
        },
      ]
    },
    {
      id: 3,
      title: t('project.navigation.submenu.others.telecom'),
      icon: 'mdi:transmission-tower',
      routes: [
        {
          id: 6,
          title: t('project.navigation.submenu.others.telecom-infrastructure'),
          path: `${baseUrl}/telecom/telecom-infrastructure`,
          model: 'telecom',
          apiRoute: 'telecoms'
        },
        {
          id: 27,
          title: t('project.navigation.submenu.others.mobile-network'),
          path: `${baseUrl}/telecom/mobile-network`,
          model: 'mobilenetwork',
          apiRoute: 'mobile-networks'
        },
        {
          id: 28,
          title: t('project.navigation.submenu.others.mobile-network-component-age'),
          path: `${baseUrl}/telecom/mobile-network-component-age`,
          model: 'mobilenetworkcomponentage',
          apiRoute: 'mobile-network-component-ages'
        },
        {
          id: 29,
          title: t('project.navigation.submenu.others.network-coverage'),
          path: `${baseUrl}/telecom/network-coverage`,
          model: 'networkcoverage',
          apiRoute: 'network-coverages'
        },
        {
          id: 46,
          title: t('project.navigation.submenu.others.data-center'),
          path: `${baseUrl}/telecom/data-center`,
          model: 'networkcoverage',
          apiRoute: 'data-centers'
        },
        {
          id: 48,
          title: t('project.navigation.submenu.others.environmental-control'),
          path: `${baseUrl}/telecom/environmental-control`,
          model: 'networkcoverage',
          apiRoute: 'environmental-controls'
        },
        {
          id: 51,
          title: t("project.navigation.submenu.others.telecom-infrastructure-component"),
          path: `${baseUrl}/telecom/telecom-infrastructure-component`,
          model: "telecominfrastructurecomponent",
          apiRoute: "telecom-infrastructure-components",
        },
        {
          id: 53,
          title: t("project.navigation.submenu.others.telecom-infrastructure-age"),
          path: `${baseUrl}/telecom/telecom-infrastructure-age`,
          model: "telecominfrastructureage",
          apiRoute: "telecom-infrastructure-ages",
        },
        {
          id: 55,
          title: t("project.navigation.submenu.others.maintenance"),
          path: `${baseUrl}/maintenance/maintenance`,
          model: "maintenance",
          apiRoute: "maintenances",
        },
        {
          id: 57,
          title: t("project.navigation.submenu.others.network-capacity"),
          path: `${baseUrl}/network/network-capacity`,
          model: "networkcapacity",
          apiRoute: "network-capacities",
        },
        {
          id: 59,
          title: t("project.navigation.submenu.others.satellite-network"),
          path: `${baseUrl}/network/satellite-network`,
          model: "satellitenetwork",
          apiRoute: "satellite-networks",
        },
      ]
    },

    {
      id: 4,
      title: t('project.navigation.submenu.others.electric-power'),
      icon: 'mdi:lightning-bolt',
      routes: [
        {
          id: 7,
          title: t('project.navigation.submenu.others.generating-capacity'),
          path: `${baseUrl}/electric-power/generating-capacity`,
          model: 'generatingcapacity',
          apiRoute: 'generating-capacities'
        },
        {
          id: 8,
          title: t('project.navigation.submenu.others.turbine-info'),
          path: `${baseUrl}/electric-power/turbine-info`,
          model: 'turbineinfo',
          apiRoute: 'turbine-infos'
        },
        {
          id: 9,
          title: t('project.navigation.submenu.others.hydro-electric-dam'),
          path: `${baseUrl}/electric-power/hydro-electric-dam`,
          model: 'hydroelectricdam',
          apiRoute: 'hydro-electric-dams'
        },
        {
          id: 10,
          title: t('project.navigation.submenu.others.solar-energy'),
          path: `${baseUrl}/electric-power/solar-energy`,
          model: 'solarenergy',
          apiRoute: 'solar-energies'
        },
        {
          id: 11,
          title: t('project.navigation.submenu.others.wind-energy'),
          path: `${baseUrl}/electric-power/wind-energy`,
          model: 'windenergy',
          apiRoute: 'wind-energies'
        },
        {
          id: 12,
          title: t('project.navigation.submenu.others.transformers-types'),
          path: `${baseUrl}/electric-power/transformers-types`,
          model: 'transformertype',
          apiRoute: 'transformer-types'
        },
        {
          id: 13,
          title: t('project.navigation.submenu.others.transformers-registration'),
          path: `${baseUrl}/electric-power/transformers-registration`,
          model: 'transformer',
          apiRoute: 'transformers'
        },
        {
          id: 14,
          title: t('project.navigation.submenu.others.transmission-lines'),
          path: `${baseUrl}/electric-power/transmission-lines`,
          model: 'transmissionline',
          apiRoute: 'transmission-lines'
        },
        {
          id: 15,
          title: t('project.navigation.submenu.others.electric-tower-registration'),
          path: `${baseUrl}/electric-power/electric-tower-registration`,
          model: 'electrictower',
          apiRoute: 'electric-towers'
        }
      ]
    },
    {
      id: 5,
      title: t('project.navigation.submenu.others.railway'),
      icon: 'mdi:train',
      routes: [
        {
          id: 16,
          title: t('project.navigation.submenu.others.railways'),
          path: `${baseUrl}/railway/railway`,
          model: 'railway',
          apiRoute: 'railways'
        },
        {
          id: 17,
          title: t('project.navigation.submenu.others.railway-station'),
          path: `${baseUrl}/railway/railway-station`,
          model: 'railwaystation',
          apiRoute: 'railway-stations'
        }
      ]
    },
    {
      id: 6,
      title: t('project.navigation.submenu.others.water-irrigation'),
      icon: 'mdi:water',
      routes: [
        {
          id: 18,
          title: t('project.navigation.submenu.others.reservoir-detail'),
          path: `${baseUrl}/irrigation-dam/reservoir-detail`,
          model: 'reservoirinfo',
          apiRoute: 'reservoir-infos'
        },
        {
          id: 19,
          title: t('project.navigation.submenu.others.spillway-detail'),
          path: `${baseUrl}/irrigation-dam/spillway-detail`,
          model: 'spillwayinfo',
          apiRoute: 'spillway-infos'
        },
        {
          id: 20,
          title: t('project.navigation.submenu.others.irrigation-capacity'),
          path: `${baseUrl}/irrigation-dam/irrigation-capacity`,
          model: 'irrigationcapacity',
          apiRoute: 'irrigation-capacities'
        },
        {
          id: 21,
          title: t('project.navigation.submenu.others.water-irrigation-dam'),
          path: `${baseUrl}/irrigation-dam/water-irrigation-dam`,
          model: 'waterirrigationdam',
          apiRoute: 'water-irrigation-dams'
        }
      ]
    },
    {
      id: 7,
      title: t('project.navigation.submenu.others.port'),
      icon: 'mdi:plane-train',
      routes: [
        {
          id: 22,
          title: t('project.navigation.submenu.others.port'),
          path: `${baseUrl}/port/port`,
          model: 'port',
          apiRoute: 'ports'
        }
      ]
    }
  ];
};
export default useSubMenuItems;
export const findOtherModelName = (subMenuItems: SubMenuItem[], submenuId: number, routeId: number): string | undefined => {
  return subMenuItems.find((submenu) => submenu.id === submenuId)?.routes.find((route) => route.id === routeId)?.model;
};
export const findOtherSubMenu = (subMenuItems: SubMenuItem[], submenuId: number, routeId: number) => {
  return subMenuItems.find((submenu) => submenu.id === submenuId)?.routes.find((route) => route.id === routeId);
};
