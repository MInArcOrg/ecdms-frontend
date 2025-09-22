import { DetailMenuItem } from "src/types/layouts/detail-layout";

// Define an object for ID constants
export const stakeholderMenuIds = {
  ORGANIZATION: "ORGANIZATION",
  RESOURCE: "RESOURCE",
  PROJECTS: "PROJECTS",
};

const menuItems = (id: string, typeId: string): DetailMenuItem[] => {
  const baseUrl = `/stakeholders/${typeId}/details/${id}`;

  return [
    {
      id: stakeholderMenuIds.ORGANIZATION,
      title: "stakeholder.navigation.menu.organization",
      path: `${baseUrl}/organization`,
    },
    {
      id: stakeholderMenuIds.RESOURCE,
      title: "stakeholder.navigation.menu.resource",
      path: `${baseUrl}/resource`,
    },
    {
      id: stakeholderMenuIds.PROJECTS,
      title: "stakeholder.navigation.menu.projects",
      path: `${baseUrl}/projects`,
    },
  ];
};

export type StakeholderMenuItem = ReturnType<typeof menuItems>;
export default menuItems;
