const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'summary',
    path: `/projects/${typeId}/details/${id}/report/summary`
  },
  {
    id: 2,
    title: 'report',
    path: `/projects/${typeId}/details/${id}/report/report`
  }
];

export default subMenuItems;
