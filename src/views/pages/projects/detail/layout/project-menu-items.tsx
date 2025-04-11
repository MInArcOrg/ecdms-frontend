import { DetailMenuItem } from 'src/types/layouts/detail-layout';

// Define an object for ID constants
export const projectMenuIds = {
  projectSetup: 'PROJECT_SETUP',
  resource: 'RESOURCE',
  reporting: 'REPORTING'
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/projects/${typeId}/details/${id}`;

  return [
    {
      id: projectMenuIds.projectSetup,
      title: 'project.navigation.menu.project-setup',
      path: `${baseUrl}/project-setup`
    },
    {
      id: projectMenuIds.resource,
      title: 'project.navigation.menu.resource',
      path: `${baseUrl}/resource`
    },
    {
      id: projectMenuIds.reporting,
      title: 'project.navigation.menu.reporting',
      path: `${baseUrl}/reporting`
    }
  ];
};

export type ProjectMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
