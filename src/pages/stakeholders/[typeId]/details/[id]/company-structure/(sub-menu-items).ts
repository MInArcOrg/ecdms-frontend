const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.company-structure.departments', // Localization key for Departments
    path: `/stakeholders/${typeId}/details/${id}/departments`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.company-structure.positions', // Localization key for Positions
    path: `/stakeholders/${typeId}/details/${id}/positions`
  }
];

export default subMenuItems;
