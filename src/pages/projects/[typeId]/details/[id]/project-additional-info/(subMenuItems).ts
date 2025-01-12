const subMenuItems = (id: string, typeId: string) => [
    {
      id: 1,
      title: 'project.additional-info.title',
      path: `/projects/${typeId}/details/${id}/project-additional-info`,
      model: 'project-additional-info'
    }
  ];
  
  export default subMenuItems; 