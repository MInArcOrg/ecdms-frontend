import { projectMasterModels } from 'src/constants/master-data/project-general-master-constants';
import { resourceMasterModels } from 'src/constants/master-data/resource-general-master-constants';

const baseUrl = '/master-data/general';

const menuItems = (t: (item: string) => void) => [
  {
    id: 1,
    title: t('master-data.stakeholder'),
    basePath: `${baseUrl}/stakeholder`,
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
    basePath: `${baseUrl}/project`,
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
    basePath: `${baseUrl}/resource`,
    children: Object.values(resourceMasterModels)
      .sort((a, b) => a.title.localeCompare(b.title))
      .map((item, index) => ({
        id: index + 1,
        title: t(`master-data.general-master.${item.title}`),
        path: `${baseUrl}/resource/${item.title}/`
      }))
  }
];

export default menuItems;
