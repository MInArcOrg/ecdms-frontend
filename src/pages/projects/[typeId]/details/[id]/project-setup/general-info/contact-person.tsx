import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import ProjectContactPersonList from 'src/views/pages/projects/detail/project-contact-person';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

const ProjectContactPerson = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.projectSetup}
      activeSubMenuId={projectSetupIds.generalInfo.contactPerson}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <ProjectContactPersonList projectId={String(id)} />
    </ProjectLayout>
  );
};

ProjectContactPerson.acl = {
  subject: 'projectstatus',
  action: 'view'
};

export default ProjectContactPerson;
