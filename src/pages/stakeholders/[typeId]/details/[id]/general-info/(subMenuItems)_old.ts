const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Manager',
    path: `/stakeholders/${typeId}/details/${id}/general-info/manager`
  },
  {
    id: 2,
    title: 'Contact Person',
    path: `/stakeholders/${typeId}/details/${id}/general-info/contact-person`
  },
  {
    id: 3,
    title: 'Address',
    path: `/stakeholders/${typeId}/details/${id}/general-info/address`
  },
  {
    id: 4,
    title: 'Joint Venture',
    path: `/stakeholders/${typeId}/details/${id}/general-info/joint-venture`
  },
  {
    id: 5,
    title: 'Joint Venture Company',
    path: `/stakeholders/${typeId}/details/${id}/general-info/joint-venture-company`
  },
  {
    id: 6,
    title: 'Additional Info',
    path: `/stakeholders/${typeId}/details/${id}/general-info/additional-info`
  },
  {
    id: 7,
    title: 'Upgrade',
    path: `/stakeholders/${typeId}/details/${id}/general-info/upgrade`
  }
];

export default subMenuItems;
