// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'Dashboards',
      icon: 'tabler:smart-home',
      path: '/dashboard'
    },
    {
      sectionTitle: 'admin-module'
    },
    {
      title: 'User',
      icon: 'tabler:user',
      children: [
        {
          title: 'List',
          path: '/admin/users'
        }
      ]
    },
    {
      title: 'Roles & Permissions',
      icon: 'tabler:settings',
      children: [
        {
          title: 'Roles',
          path: '/admin/roles'
        },
        {
          title: 'Permissions',
          path: '/admin/permissions'
        }
      ]
    }
  ];
};

export default navigation;
