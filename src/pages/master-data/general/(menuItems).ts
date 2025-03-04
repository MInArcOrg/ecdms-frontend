const baseUrl = '/master-data/general';

const menuItems = (t: (item: string) => void) => [
  {
    id: 1,
    title: t('master-data.stakeholder'),
    children: [
      {
        id: 1,
        title: t('master-data.general-master.ownerships'),
        path: `${baseUrl}/stakeholder/ownerships/`
      },
      {
        id: 2,
        title: t('master-data.general-master.business-fields'),
        path: `${baseUrl}/stakeholder/business-fields/`
      },
      {
        id: 3,
        title: t('master-data.general-master.study-levels'),
        path: `${baseUrl}/stakeholder/study-levels/`
      },
      {
        id: 4,
        title: t('master-data.general-master.study-programs'),
        path: `${baseUrl}/stakeholder/study-programs/`
      },
      {
        id: 5,
        title: t('master-data.general-master.study-fields'),
        path: `${baseUrl}/stakeholder/study-fields/`
      },
      {
        id: 6,
        title: t('master-data.general-master.age-levels'),
        path: `${baseUrl}/stakeholder/age-levels/`
      },
      {
        id: 7,
        title: t('master-data.general-master.work-experiences'),
        path: `${baseUrl}/stakeholder/work-experiences/`
      }
    ]
  },

  {
    id: 2,
    title: t('master-data.project'),
    children: [
      {
        id: 1,
        title: t('master-data.general-master.project-progress-statuses'),
        path: `${baseUrl}/project/project-progress-statuses/`
      },
      {
        id: 2,
        title: t('master-data.general-master.pedestrian-facilities'),
        path: `${baseUrl}/project/pedestrian-facilities/`
      },
      {
        id: 3,
        title: t('master-data.general-master.road-length-types'),
        path: `${baseUrl}/project/road-length-types/`
      },
      {
        id: 4,
        title: t('master-data.general-master.endwall-type-inlets'),
        path: `${baseUrl}/project/endwall-type-inlets/`
      },
      {
        id: 5,
        title: t('master-data.general-master.area-topographies'),
        path: `${baseUrl}/project/area-topographies/`
      },
      {
        id: 6,
        title: t('master-data.general-master.soil-types'),
        path: `${baseUrl}/project/soil-types/`
      },
      {
        id: 7,
        title: t('master-data.general-master.guard-rail-types'),
        path: `${baseUrl}/project/guard-rail-types/`
      },
      {
        id: 8,
        title: t('master-data.general-master.bridge-structure-types'),
        path: `${baseUrl}/project/bridge-structure-types/`
      },
      {
        id: 9,
        title: t('master-data.general-master.span-support-types'),
        path: `${baseUrl}/project/span-support-types/`
      },
      {
        id: 10,
        title: t('master-data.general-master.damage-conditions'),
        path: `${baseUrl}/project/damage-conditions/`
      },
      {
        id: 11,
        title: t('master-data.general-master.hydrology-defects'),
        path: `${baseUrl}/project/hydrology-defects/`
      },
      {
        id: 12,
        title: t('master-data.general-master.count-types'),
        path: `${baseUrl}/project/count-types/`
      },
      {
        id: 13,
        title: t('master-data.general-master.road-safety-features'),
        path: `${baseUrl}/project/road-safety-features/`
      },
      {
        id: 14,
        title: t('master-data.general-master.current-conditions'),
        path: `${baseUrl}/project/current-conditions/`
      },
      {
        id: 15,
        title: t('master-data.general-master.ground-water-impacts'),
        path: `${baseUrl}/project/ground-water-impacts/`
      },
      {
        id: 16,
        title: t('master-data.general-master.maintenance-types'),
        path: `${baseUrl}/project/maintenance-types/`
      },
      {
        id: 17,
        title: t('master-data.general-master.slope-stabilities'),
        path: `${baseUrl}/project/slope-stabilities/`
      },
      {
        id: 18,
        title: t('master-data.general-master.drainage-types'),
        path: `${baseUrl}/project/drainage-types/`
      },
      {
        id: 19,
        title: t('master-data.general-master.maintenance-frequencies'),
        path: `${baseUrl}/project/maintenance-frequencies/`
      },
      {
        id: 21, 
        title: t("master-data.general-master.abutment-types"),
        path: `${baseUrl}/project/abutment-types/`,
      },
    ]
  },
  {
    id: 3,
    title: t('master-data.resource'),
    children: [
      {
        id: 1,
        title: t('master-data.general-master.construction-related-services'),
        path: `${baseUrl}/resource/construction-related-services/`
      }
    ]
  }
];

export default menuItems;
