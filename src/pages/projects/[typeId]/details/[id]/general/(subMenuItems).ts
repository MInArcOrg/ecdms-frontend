const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'General Info',
    path: `/projects/${typeId}/details/${id}/general/detail`
  },
  {
    id: 2,
    title: 'To Date Status',
    path: `/projects/${typeId}/details/${id}/general/to-date-status`
  },
  {
    id: 3,
    title: 'Address',
    path: `/projects/${typeId}/details/${id}/general/address`
  },
  {
    id: 4,
    title: 'Project Status',
    path: `/projects/${typeId}/details/${id}/general/project-status`
  }
  // {
  //   id: 5,
  //   title: 'Road Location',
  //   path: `/projects/${typeId}/details/${id}/general/roadLocation`
  // }
];

export default subMenuItems;
