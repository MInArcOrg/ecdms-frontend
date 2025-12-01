// ** Type import
import { VerticalNavItemsType } from 'src/@core/layouts/types';

const navigation = (): VerticalNavItemsType => {
  return [
    {
      title: 'navigation.dashboard',
      icon: 'tabler:smart-home',
      path: '/dashboard',
      action: 'view',
      subject: 'dashboard'
    },

    {
      sectionTitle: 'navigation.admin-module'
    },
    {
      title: 'navigation.centers',
      icon: 'tabler:building',
      path: '/departments',
      action: 'view',
      subject: 'department'
    },
    {
      title: 'navigation.address',
      icon: 'tabler:location',
      path: '/address-master',
      action: 'view',
      subject: 'addressmaster'
    },
    {
      title: 'navigation.roles',
      icon: 'tabler:settings',
      path: '/admin/roles',
      action: 'view',
      subject: 'role'
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
          icon: 'tabler:users',
          action: 'view',
          subject: 'stakeholdermasterdata'
        },
        {
          title: 'navigation.master-data.project',
          path: '/master-data/project',
          icon: 'tabler:box-multiple',
          action: 'view',
          subject: 'projectmasterdata'
        },
        {
          title: 'navigation.master-data.infrastructure',
          path: '/master-data/infrastructure',
          icon: 'tabler:box-multiple',
          action: 'view',
          subject: 'infrastructuremasterdata'
        },
        {
          title: 'navigation.master-data.resource',
          path: '/master-data/resource',
          icon: 'tabler:calendar',
          action: 'view',
          subject: 'resourcemasterdata'
        },
        {
          title: 'navigation.master-data.document',
          path: '/master-data/document',
          icon: 'tabler:file',
          action: 'view',
          subject: 'documentmasterdata'
        },
         {
      title: 'navigation.address',
      icon: 'tabler:location',
      path: '/address-master',
      action: 'view',
      subject: 'addressmasterdata'
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
