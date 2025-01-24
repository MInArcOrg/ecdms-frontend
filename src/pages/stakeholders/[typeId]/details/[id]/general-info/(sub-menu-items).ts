const subMenuItems = (id: string, typeId: string) => [
  {
    id: 8,
    title: 'stakeholder.navigation.submenu.general-info.manager',
    path: `/stakeholders/${typeId}/details/${id}/general-info/manager`
  },
  {
    id: 9,
    title: 'stakeholder.navigation.submenu.general-info.contact-person',
    path: `/stakeholders/${typeId}/details/${id}/general-info/contact-person`
  },
  {
    id: 10,
    title: 'stakeholder.navigation.submenu.general-info.address',
    path: `/stakeholders/${typeId}/details/${id}/general-info/address`
  },
  {
    id: 11,
    title: 'stakeholder.navigation.submenu.general-info.joint-venture',
    path: `/stakeholders/${typeId}/details/${id}/general-info/joint-venture`
  },
  {
    id: 12,
    title: 'stakeholder.navigation.submenu.general-info.joint-venture-company',
    path: `/stakeholders/${typeId}/details/${id}/general-info/joint-venture-company`
  },
  {
    id: 13,
    title: 'stakeholder.navigation.submenu.general-info.additional-info',
    path: `/stakeholders/${typeId}/details/${id}/general-info/additional-info`
  },
  {
    id: 14,
    title: 'stakeholder.navigation.submenu.general-info.upgrade',
    path: `/stakeholders/${typeId}/details/${id}/general-info/upgrade`
  }
];

export default subMenuItems;
