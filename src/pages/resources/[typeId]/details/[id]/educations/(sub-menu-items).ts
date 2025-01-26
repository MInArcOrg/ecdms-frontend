const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.educations.educations', // Localization key for Address
    path: `/resources/${typeId}/details/${id}/educations/educations`
  },
  {
    id: 2,
    title: 'resource.navigation.submenu.educations.trainings', // Localization key for Address
    path: `/resources/${typeId}/details/${id}/educations/training`
  }
];

export default subMenuItems;
