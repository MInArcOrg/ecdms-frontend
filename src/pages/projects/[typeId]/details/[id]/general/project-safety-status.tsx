import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import subMenuItems from './(subMenuItems)';
import ProjectSafetyStatusList from 'src/views/pages/projects/detail/project-safety-status';

function ProjectSafetyStatusIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ResourceLayout activeMenu={0} activeSubMenu={6} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectSafetyStatusList model="project-safety-status" projectId={String(id)} typeId={String(typeId)} />
    </ResourceLayout>
  );
}

ProjectSafetyStatusIndex.acl = {
  subject: 'resource',
  action: 'view_resource'
};

export default ProjectSafetyStatusIndex;