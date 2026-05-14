import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectResourceIds } from '../(subMenuItems)';
import { projectFileConstant } from 'src/constants/project-file-contant';
import ProjectFileList from 'src/views/pages/projects/detail/project-file/project-file/project-file';

const ProjectStakeholder = () => {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.resource}
      activeSubMenuId={projectResourceIds.documents.other}
      subMenuItems={subMenuItems}
    >
      <ProjectFileList projectId={String(id)} type={projectFileConstant.OTHER.value} />
    </ProjectLayout>
  );
};

ProjectStakeholder.acl = {
  subject: 'projectdesign',
  action: 'view'
};

export default ProjectStakeholder;
