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
        },
        {
          title: 'Project Additional Info',
          icon: 'tabler:file-info',
          path: '/projects/project-additional-info',
          action: 'view_additionalinfo',
          subject: 'additionalinfo'
        },
        {
          title: 'Project Outcome',
          icon: 'tabler:chart-bar',
          path: '/projects/project-outcome',
          action: 'view_projectOutcome',
          subject: 'outcome'
        }
      ]
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
      sectionTitle: 'navigation.depamrtent-module'
    },
    {
      title: 'navigation.department',
      icon: 'tabler:building',
      path: '/departments'
    },
    {
      sectionTitle: 'navigation.main-module'
    }
  ];
};

export default navigation;
