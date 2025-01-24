interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.resources.machineries', // Localization key for Machineries
    path: `/stakeholders/${typeId}/details/${id}/machineries`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.resources.vehicles', // Localization key for Vehicles
    path: `/stakeholders/${typeId}/details/${id}/vehicles`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.resources.safety-equipment', // Localization key for Safety Equipment
    path: `/stakeholders/${typeId}/details/${id}/safety-equipment`
  },
  {
    id: 4,
    title: 'stakeholder.navigation.submenu.resources.materials', // Localization key for Materials
    path: `/stakeholders/${typeId}/details/${id}/materials`
  },
  {
    id: 5,
    title: 'stakeholder.navigation.submenu.resources.employees', // Localization key for Employees
    path: `/stakeholders/${typeId}/details/${id}/employees`
  }
];

export default subMenuItems;
