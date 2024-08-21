import { useTranslation } from 'next-i18next';
interface Route {
  id: number;
  title:string;
  path: string;
  model: string;
}

interface SubMenuItem {
  id: number;
  title:string;
  icon:string;
  routes: Route[];
}

const subMenuItems = (baseUrl: string): SubMenuItem[] => {
  const { t } = useTranslation('common'); // Assuming your translations are in 'common.json'

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
          model: 'buildingdimensiondetail'
        },
        {
          id: 2,
          title: t('project.navigation.submenu.others.building-envelop-material'),
          path: `${baseUrl}/building/building-envelop-material`,
          model: 'buildingenvelopmaterial'
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
          title: t('project.navigation.submenu.others.road-detail'),
          path: `${baseUrl}/road/road-detail`,
          model: 'roadinfo'
        },
        {
          id: 4,
          title: t('project.navigation.submenu.others.road-segments-data'),
          path: `${baseUrl}/road/road-segments-data`,
          model: 'roadsegment'
        },
        {
          id: 5,
          title: t('project.navigation.submenu.others.layers-of-road-data'),
          path: `${baseUrl}/road/layers-of-road-data`,
          model: 'roadlayer'
        }
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
          model: 'telecom'
        }
      ]
    },

    {
      id: 4,
      title: t('project.navigation.submenu.others.electric-power'),
      icon: 'mdi:lightning-bolt',
      routes: [
        {
          id: 7,
          title: t('project.navigation.submenu.others.generation-capacity'),
          path: `${baseUrl}/electric-dam/generation-capacity`,
          model: 'generatingcapacity'
        },
        {
          id: 8,
          title: t('project.navigation.submenu.others.turbines-detail'),
          path: `${baseUrl}/electric-dam/turbines-detail`,
          model: 'turbineinfo'
        },
        {
          id: 9,
          title: t('project.navigation.submenu.others.hydroelectric-dam'),
          path: `${baseUrl}/electric-dam/hydroelectric-dam`,
          model: 'hydroelectricdam'
        },
        {
          id: 10,
          title: t('project.navigation.submenu.others.solar-energy'),
          path: `${baseUrl}/electric-dam/solar-energy`,
          model: 'solarenergy'
        },
        {
          id: 11,
          title: t('project.navigation.submenu.others.wind-energy'),
          path: `${baseUrl}/electric-dam/wind-energy`,
          model: 'windenergy'
        },
        {
          id: 12,
          title: t('project.navigation.submenu.others.transformers-types'),
          path: `${baseUrl}/electric-dam/transformers-types`,
          model: 'transformertype'
        },
        {
          id: 13,
          title: t('project.navigation.submenu.others.transformers-registration'),
          path: `${baseUrl}/electric-dam/transformers-registration`,
          model: 'transformer'
        },
        {
          id: 14,
          title: t('project.navigation.submenu.others.transmission-lines'),
          path: `${baseUrl}/electric-dam/transmission-lines`,
          model: 'transmissionline'
        },
        {
          id: 15,
          title: t('project.navigation.submenu.others.electric-tower-registration'),
          path: `${baseUrl}/electric-dam/electric-tower-registration`,
          model: 'electrictower'
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
          title: t('project.navigation.submenu.others.railway-detail'),
          path: `${baseUrl}/railway/railway-detail`,
          model: 'railway'
        },
        {
          id: 17,
          title: t('project.navigation.submenu.others.railway-station'),
          path: `${baseUrl}/railway/railway-station`,
          model: 'railwaystation'
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
          model: 'reservoirinfo'
        },
        {
          id: 19,
          title: t('project.navigation.submenu.others.spillway-detail'),
          path: `${baseUrl}/irrigation-dam/spillway-detail`,
          model: 'spillwayinfo'
        },
        {
          id: 20,
          title: t('project.navigation.submenu.others.irrigation-capacity'),
          path: `${baseUrl}/irrigation-dam/irrigation-capacity`,
          model: 'irrigationcapacity'
        },
        {
          id: 21,
          title: t('project.navigation.submenu.others.water-irrigation-dam'),
          path: `${baseUrl}/irrigation-dam/water-irrigation-dam`,
          model: 'waterirrigationdam'
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
          model: 'port'
        }
      ]
    }
  ];
};
export const findOtherModelName = (baseUrl: string, submenuId: number, routeId: number): string | undefined =>
  subMenuItems(baseUrl)
    .find(submenu => submenu.id === submenuId)
    ?.routes.find(route => route.id === routeId)?.model;
export default subMenuItems;
