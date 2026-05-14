import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RailwayTrackConditionAssesmentList from 'src/views/pages/projects/detail/other/railway/railway-track-condition-assessment';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.trackSystems.tracksConditionAssessment);

const TracksConditionAssessmentPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.trackSystems.tracksConditionAssessment
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.trackSystems.tracksConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayTrackConditionAssesmentList projectId={String(id)} typeId={String(typeId)} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

TracksConditionAssessmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TracksConditionAssessmentPage;
