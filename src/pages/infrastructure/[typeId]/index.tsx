import ProjectList from 'src/views/pages/projects/project-list';

const ProjectPage = () => {
  return <ProjectList  />;
};
ProjectPage.acl = {
  action: 'view',
  subject: 'project'
};

export default ProjectPage;
