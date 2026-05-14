import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastConditionAssessmentList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-condition-assessment';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.subBallastSystems.subBallastConditionAssessment
);

const SubBallastConditionAssessmentPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastConditionAssessment
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastConditionAssessment}
      subMenuItems={subMenuItems}
    >
      <RailwaySubBallastConditionAssessmentList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SubBallastConditionAssessmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastConditionAssessmentPage;
