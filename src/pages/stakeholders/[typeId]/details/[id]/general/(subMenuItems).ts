const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Detail',
    path: `/stakeholders/${typeId}/details/${id}/general/detail`
  },
  {
    id: 2,
    title: 'Stakeholder Info',
    path: `/stakeholders/${typeId}/details/${id}/general/stakeholder-info`
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
    path: `/stakeholders/${typeId}/details/${id}/general/contact-person`
  },
  {
    id: 6,
    title: 'Trainings',
    path: `/stakeholders/${typeId}/details/${id}/general/trainings`
  },
  {
    id: 7,
    title: 'Regulations',
    path: `/stakeholders/${typeId}/details/${id}/general/regulations`
  }
];

export default subMenuItems;
