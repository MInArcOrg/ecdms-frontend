import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySleeperConditionAssessmentList from 'src/views/pages/projects/detail/other/road/railway-sleeper-condition-assessment';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperConditionAssessment
);

const SleeperConditionAssessmentPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperConditionAssessment
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwaySleeperConditionAssessmentList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SleeperConditionAssessmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SleeperConditionAssessmentPage;
