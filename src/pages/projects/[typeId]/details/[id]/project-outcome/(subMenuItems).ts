const subMenuItems = (id: string, typeId: string) => [
    {
      id: 1,
      title: 'project.outcome.title',
      path: `/projects/${typeId}/details/${id}/project-outcome`,
      model: 'project-outcome'
    }
  ];
  
  export default subMenuItems; 