import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import subMenuItems from '../(subMenuItems)';
import ProjectWetherConditionList from 'src/views/pages/projects/detail/project-weather-condition/';

function ProjectSafetyStatusIndex() {
  const router = useRouter();
  const { id, typeId } = router.query;

  return (
    <ProjectLayout activeMenu={0} activeSubMenu={8} subMenuItems={subMenuItems(id as string, typeId as string)}>
      <ProjectWetherConditionList model="project-safety-status" projectId={String(id)} typeId={String(typeId)} />
    </ProjectLayout>
  );
}

ProjectSafetyStatusIndex.acl = {
  subject: 'projectsafetystatus',
  action: 'view_project_safety_status'
};

export default ProjectSafetyStatusIndex;
