const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.professional.contact.title',
    path: `/resources/${typeId}/details/${id}/contact-person/`,
    model: 'professional-contact'
  }
];

export default subMenuItems;
