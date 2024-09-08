const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Stakeholder',
    path: `/stakeholders/${typeId}/details/${id}/general/stakeholder`
  },
  {
    id: 2,
    title: 'Detail',
    path: `/stakeholders/${typeId}/details/${id}/general/detail`
  },
  {
    id: 3,
    title: 'Certificates',
    path: `/stakeholders/${typeId}/details/${id}/general/certificates`
  },
  {
    id: 4,
    title: 'Address',
    path: `/stakeholders/${typeId}/details/${id}/general/address`
  },
  {
    id: 5,
    title: 'Contact Person',
    path: `/stakeholders/${typeId}/details/${id}/general/contact`
  }
];

export default subMenuItems;
