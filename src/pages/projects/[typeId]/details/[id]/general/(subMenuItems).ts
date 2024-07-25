const subMenuItems = (id: string, typeid: string) => [
  {
    id: 1,
    title: 'General Info',
    path: `/projects/${typeid}/details/${id}/general/detail`
  },
  {
    id: 2,
    title: 'To Date Status',
    path: `/projects/${typeid}/details/${id}/general/to-date-status`
  },
  {
    id: 3,
    title: 'Address',
    path: `/projects/${typeid}/details/${id}/general/address`
  },
  {
    id: 4,
    title: 'Project Status',
    path: `/projects/${typeid}/details/${id}/general/projectStatus`
  }
  // {
  //   id: 5,
  //   title: 'Road Location',
  //   path: `/projects/${typeid}/details/${id}/general/roadLocation`
  // }
]

export default subMenuItems
