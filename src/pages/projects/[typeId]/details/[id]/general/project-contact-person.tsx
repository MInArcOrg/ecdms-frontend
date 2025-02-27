import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectContactPersonList  from 'src/views/pages/projects/detail/project-contact-person';
import subMenuItems from './(subMenuItems)';

const ProjectContactPerson = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={5} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectContactPersonList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectContactPerson.acl = {
  subject: 'projectstatus',
  action: 'view_projectstatus'
};

export default ProjectContactPerson;
