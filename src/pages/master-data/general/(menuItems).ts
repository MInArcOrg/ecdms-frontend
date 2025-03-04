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
        path: `${baseUrl}/stakeholder/project-progress-statuses/`
      },
      {
        id: 2, 
        title: t("master-data.general-master.functional-classifications"),
        path: `${baseUrl}/project/functional-classifications/`,
      },
      {
        id: 3,
        title: t('master-data.general-master.design-classifications'),
        path: `${baseUrl}/project/design-classifications/`
      },
      {
        id: 4, // Make sure this ID is unique
        title: t("master-data.general-master.design-standards"),
        path: `${baseUrl}/project/design-standards/`,
      },
      {
        id: 5, 
        title: t("master-data.general-master.design-traffic-flows"),
        path: `${baseUrl}/project/design-traffic-flows/`,
      },
      {
        id: 6, 
        title: t("master-data.general-master.surface-types"),
        path: `${baseUrl}/project/surface-types/`,
      },
      {
        id: 7,
        title: t("master-data.general-master.cross-section-types"),
        path: `${baseUrl}/project/cross-section-types/`,
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
