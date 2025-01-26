const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.recomendations.recomendations', // Localization key for Address
    path: `/resources/${typeId}/details/${id}/recomendations/recomendations`
  }
];

export default subMenuItems;
