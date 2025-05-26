import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.communicationAndSignaling.railwaySystemConditionAssessment
);

const RailwaySystemConditionAssessmentPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling.railwaySystemConditionAssessment
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.communicationAndSignaling.railwaySystemConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway System Condition Assessment Placeholder</div>
    </ProjectLayout>
  );
};

RailwaySystemConditionAssessmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwaySystemConditionAssessmentPage;
