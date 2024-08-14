const subMenuItems = (id: string, typeId: string) => [
  {
    id: 1,
    title: 'Timeline',
    path: `/projects/${typeId}/details/${id}/time/timeline`
  },
  {
    id: 2,
    title: 'Time Analysis',
    path: `/projects/${typeId}/details/${id}/time/time-analysis`
  },
  {
    id: 3,
    title: 'Extension Time',
    path: `/projects/${typeId}/details/${id}/time/extension-time`
  }
];

export default subMenuItems;
