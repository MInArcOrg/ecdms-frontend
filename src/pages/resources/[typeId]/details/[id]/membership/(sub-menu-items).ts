const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.membership.association', // Localization key for Address
    path: `/resources/${typeId}/details/${id}/membership/association`
  }
];

export default subMenuItems;
