interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.incentives.trainings', // Localization key for Trainings
    path: `/stakeholders/${typeId}/details/${id}/incentives/trainings`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.incentives.support', // Localization key for Support
    path: `/stakeholders/${typeId}/details/${id}/incentives/support`
  }
];

export default subMenuItems;
