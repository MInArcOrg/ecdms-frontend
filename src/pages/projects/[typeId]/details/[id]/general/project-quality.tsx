import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from './(subMenuItems)';
import ProjectQualityList from 'src/views/pages/projects/detail/project-quality';

function ProjectQualityIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={7} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectQualityList model="project-quality" projectId={String(id)} typeId={String(typeId)} />
    </ProjectLayout>
  );
}

ProjectQualityIndex.acl = {
  subject: 'projectquality',
  action: 'view_project_quality'
};

export default ProjectQualityIndex;