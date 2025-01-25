const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Statistics',
    path: `/stakeholders/${typeId}/details/${id}/employees/statistics`
  },
  {
    id: 2,
    title: 'Education',
    path: `/stakeholders/${typeId}/details/${id}/employees/education`
  },
  {
    id: 3,
    title: 'Age',
    path: `/stakeholders/${typeId}/details/${id}/employees/age`
  },
  {
    id: 4,
    title: 'Work Experience',
    path: `/stakeholders/${typeId}/details/${id}/employees/work`
  }
];

export default subMenuItems;
