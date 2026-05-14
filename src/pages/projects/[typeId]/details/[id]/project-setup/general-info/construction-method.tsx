import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import ConstructionMethodList from 'src/views/pages/projects/detail/construction-method';

function ConstructionMethodIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.projectSetup}
      activeSubMenuId={projectSetupIds.generalInfo.constructionMethod}
      subMenuItems={subMenuItems}
    >
      <ConstructionMethodList projectId={String(id)} />
    </ProjectLayout>
  );
}

ConstructionMethodIndex.acl = {
  subject: 'constructionmethod',
  action: 'view'
};

export default ConstructionMethodIndex;
