import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems, { projectSetupIds } from '../(subMenuItems)';
import ProjectConstructionTypeList from 'src/views/pages/projects/detail/project-construction-type';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';

function ProjectConstructionTypeIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.projectSetup}
      activeSubMenuId={projectSetupIds.generalInfo.constructionMethod}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        construction method here
      </>
    </ProjectLayout>
  );
}

ProjectConstructionTypeIndex.acl = {
  subject: 'projectconstructiontype',
  action: 'view_project_construction_type'
};

export default ProjectConstructionTypeIndex;
