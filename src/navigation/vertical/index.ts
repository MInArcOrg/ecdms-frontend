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
      title: 'navigation.user',
      icon: 'tabler:user',
      children: [
        {
          title: 'navigation.user-list',
          path: '/admin/users'
        }
      ]
    },
    {
      title: 'navigation.roles-and-permissions',
      icon: 'tabler:settings',
      children: [
        {
          title: 'navigation.roles',
          path: '/admin/roles'
        },
        {
          title: 'navigation.permissions',
          path: '/admin/permissions'
        }
      ]
    },
    {
      sectionTitle: 'navigation.department-module'
    },
    {
      title: 'navigation.department',
      icon: 'tabler:smart-home',
      path: '/departments'
    }
  ];
};

export default navigation;
