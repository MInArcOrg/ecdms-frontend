interface SubMenuItem {
  id: number;
  title: string;
  path: string;
}

const subMenuItems = (id: string, typeId: string): SubMenuItem[] => [
  {
    id: 1,
    title: 'Initiation',
    path: `/projects/${typeId}/details/${id}/project-file/initiation`
  },
  {
    id: 2,
    title: 'Planning',
    path: `/projects/${typeId}/details/${id}/project-file/planning`
  },
  {
    id: 3,
    title: 'Execution',
    path: `/projects/${typeId}/details/${id}/project-file/execution`
  },
  {
    id: 4,
    title: 'Monitoring',
    path: `/projects/${typeId}/details/${id}/project-file/monitoring`
  },
  {
    id: 5,
    title: 'Closing',
    path: `/projects/${typeId}/details/${id}/project-file/closing`
  }
];

export default subMenuItems;
