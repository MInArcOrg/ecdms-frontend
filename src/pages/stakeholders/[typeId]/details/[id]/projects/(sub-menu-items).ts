// Define TypeScript types for menu items

import { DetailSubMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const stakeholderProjectIds = {
  projects: {
    projects: 'PROJECTS',
    jointVentureProjects: 'JOINT_VENTURE_PROJECTS'
  },
  services: {
    services: 'SERVICES',
    incentives: 'INCENTIVES',
    trainings: 'TRAININGS',
    support: 'SUPPORT'
  }
};

const menuItems = (id: string, typeId: string): DetailSubMenuItem[] => [
  {
    id: stakeholderProjectIds.projects.projects,
    title: 'stakeholder.navigation.submenu.projects.projects.projects',
    subItems: [
      {
        id: stakeholderProjectIds.projects.projects,
        title: 'stakeholder.navigation.submenu.projects.projects.projects',
        path: `/stakeholders/${typeId}/details/${id}/projects/projects/projects`
      },
      {
        id: stakeholderProjectIds.projects.jointVentureProjects,
        title: 'stakeholder.navigation.submenu.projects.projects.joint-venture-projects',
        path: `/stakeholders/${typeId}/details/${id}/projects/projects/joint-venture-projects`
      }
    ]
  },
  {
    id: stakeholderProjectIds.services.services,
    title: 'stakeholder.navigation.submenu.projects.services.services',
    subItems: [
      {
        id: stakeholderProjectIds.services.services,
        title: 'stakeholder.navigation.submenu.projects.services.services',
        path: `/stakeholders/${typeId}/details/${id}/projects/services/services`
      },
      {
        id: stakeholderProjectIds.services.incentives,
        title: 'stakeholder.navigation.submenu.projects.services.incentives',
        path: `/stakeholders/${typeId}/details/${id}/projects/services/incentives`
      },
      {
        id: stakeholderProjectIds.services.trainings,
        title: 'stakeholder.navigation.submenu.projects.services.trainings',
        path: `/stakeholders/${typeId}/details/${id}/projects/services/trainings`
      },
      {
        id: stakeholderProjectIds.services.support,
        title: 'stakeholder.navigation.submenu.projects.services.support',
        path: `/stakeholders/${typeId}/details/${id}/projects/services/support`
      }
    ]
  }
];

export default menuItems;
