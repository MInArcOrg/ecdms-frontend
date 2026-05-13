import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import ProjectFileList from 'src/views/pages/projects/detail/project-file/project-file/project-file';
import { projectFileConstant } from 'src/constants/project-file-contant';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.resource}
      activeSubMenuId={projectResourceIds.documents.construction}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {' '}
      <ProjectFileList projectId={String(id)} type={projectFileConstant.CONSTRUCTION.value} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectreport',
  action: 'view'
};

export default ProjectStakeholder;
