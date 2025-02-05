const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.professional.address.title',
    path: `/resources/${typeId}/details/${id}/address/`,
    model: 'professional-address'
  }
];

export default subMenuItems;
