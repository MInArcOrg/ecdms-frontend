const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'stakeholder.navigation.submenu.branches.branches', // Localization key for Branches
    path: `/stakeholders/${typeId}/details/${id}/branches`
  },
  {
    id: 2,
    title: 'stakeholder.navigation.submenu.branches.manager', // Localization key for Manager
    path: `/stakeholders/${typeId}/details/${id}/manager`
  },
  {
    id: 3,
    title: 'stakeholder.navigation.submenu.branches.branch-contact-person', // Localization key for Branch Contact Person
    path: `/stakeholders/${typeId}/details/${id}/branch-contact-person`
  },
  {
    id: 4,
    title: 'stakeholder.navigation.submenu.branches.address', // Localization key for Address
    path: `/stakeholders/${typeId}/details/${id}/address`
  },
  {
    id: 5,
    title: 'stakeholder.navigation.submenu.branches.additional-info', // Localization key for Additional Info
    path: `/stakeholders/${typeId}/details/${id}/additional-info`
  }
];

export default subMenuItems;
