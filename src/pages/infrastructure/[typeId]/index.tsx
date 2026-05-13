import ProjectList from 'src/views/pages/projects/project-list';

const ProjectPage = () => {
  return <ProjectList module="infrastructure" />;
};
ProjectPage.acl = {
  action: 'view',
  subject: 'infrastructure'
};

export default ProjectPage;
