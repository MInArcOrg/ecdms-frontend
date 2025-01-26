const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'resource.navigation.submenu.general-info.address', // Localization key for Address
    path: `/resources/${typeId}/details/${id}/address`
  },
  {
    id: 2,
    title: 'resource.navigation.submenu.general-info.contact', // Localization key for Contact
    path: `/resources/${typeId}/details/${id}/contact`
  },
  {
    id: 3,
    title: 'resource.navigation.submenu.general-info.contact-person', // Localization key for Contact Person
    path: `/resources/${typeId}/details/${id}/contact-person`
  },
  {
    id: 4,
    title: 'resource.navigation.submenu.general-info.additional-info', // Localization key for Additional Info
    path: `/resources/${typeId}/details/${id}/additional-info`
  }
];

export default subMenuItems;
