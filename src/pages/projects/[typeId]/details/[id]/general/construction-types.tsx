import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectConstructionTypeList from 'src/views/pages/projects/detail/project-construction-type';

function ProjectConstructionTypeIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={8} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectConstructionTypeList model="project-construction-type" projectId={String(id)} typeId={String(typeId)} />
    </ProjectLayout>
  );
}

ProjectConstructionTypeIndex.acl = {
  subject: 'projectconstructiontype',
  action: 'view_project_construction_type'
};

export default ProjectConstructionTypeIndex;
