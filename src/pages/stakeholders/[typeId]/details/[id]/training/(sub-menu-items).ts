interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.trainings.trainings', // Localization key for Trainings
    path: `/stakeholders/${typeId}/details/${id}/trainings`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.trainings.trainers', // Localization key for Trainers
    path: `/stakeholders/${typeId}/details/${id}/trainers`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.trainings.trainees', // Localization key for Trainees
    path: `/stakeholders/${typeId}/details/${id}/trainees`
  }
];

export default subMenuItems;
