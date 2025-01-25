const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.company-structure.departments', // Localization key for Departments
    path: `/stakeholders/${typeId}/details/${id}/company-structure/departments`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.company-structure.positions', // Localization key for Positions
    path: `/stakeholders/${typeId}/details/${id}/company-structure/positions`
  }
];

export default subMenuItems;
