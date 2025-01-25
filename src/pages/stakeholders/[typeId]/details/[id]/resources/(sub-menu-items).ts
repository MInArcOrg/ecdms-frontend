interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.resources.machineries', // Localization key for Machineries
    path: `/stakeholders/${typeId}/details/${id}/resources/machineries`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.resources.vehicles', // Localization key for Vehicles
    path: `/stakeholders/${typeId}/details/${id}/resources/vehicles`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.resources.safety-equipment', // Localization key for Safety Equipment
    path: `/stakeholders/${typeId}/details/${id}/resources/safety-equipment`
  },
  {
    id: 4,
    title: 'stakeholder.navigation.submenu.resources.materials', // Localization key for Materials
    path: `/stakeholders/${typeId}/details/${id}/resources/materials`
  },
  {
    id: 5,
    title: 'stakeholder.navigation.submenu.resources.employees', // Localization key for Employees
    path: `/stakeholders/${typeId}/details/${id}/resources/employees`
  }
];

export default subMenuItems;
