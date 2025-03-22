import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';

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
    children: Object.values(projectMasterModels)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((item, index) => ({
        id: index + 1,
        title: t(`master-data.general-master.${item.title}`),
        path: `${baseUrl}/project/${item.title}/`
      }))
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
