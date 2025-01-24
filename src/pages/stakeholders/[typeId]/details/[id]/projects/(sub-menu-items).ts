interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.projects.projects', // Localization key for Projects
    path: `/stakeholders/${typeId}/details/${id}/projects`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.projects.joint-venture-projects', // Localization key for Joint Venture Projects
    path: `/stakeholders/${typeId}/details/${id}/joint-venture-projects`
  }
];

export default subMenuItems;
