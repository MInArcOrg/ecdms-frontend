// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'navigation.dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },

    {
      sectionTitle: 'navigation.admin-module'
    },
    {
      title: 'navigation.department',
      icon: 'tabler:building',
      path: '/departments'
    },
    {
      title: 'navigation.address',
      icon: 'tabler:location',
      path: '/address-master'
    },
    {
      title: 'navigation.user',
      icon: 'tabler:user',
      path: '/admin/users'
    },
    {
      title: 'navigation.roles',
      icon: 'tabler:settings',
      path: '/admin/roles'
    },
    {
      sectionTitle: 'navigation.master-data.master-data'
    },
    {
      title: 'navigation.master-data.master-data',
      icon: 'tabler:database',
      children: [
        {
          title: 'navigation.master-data.stakeholder',
          path: '/master-data/stakeholder',
          icon: 'tabler:users'
        },
        {
          title: 'navigation.master-data.project',
          path: '/master-data/project',
          icon: 'tabler:box-multiple'
        },
        {
          title: 'navigation.master-data.infrastructure',
          path: '/master-data/infrastructure',
          icon: 'tabler:box-multiple'
        },
        {
          title: 'navigation.master-data.resource',
          path: '/master-data/resource',
          icon: 'tabler:calendar'
        },
        {
          title: 'navigation.master-data.document',
          path: '/master-data/document',
          icon: 'tabler:file'
        },
        {
          title: 'navigation.master-data.general',
          path: '/master-data/general',
          icon: 'tabler:tools'
        }
      ]
    },

    {
      sectionTitle: 'navigation.main-module'
    }
  ];
};

export default navigation;
