import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertConditionAssessment);

const CulvertConditionAssessment = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.culvert.culvertConditionAssessment);
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <CulvertConditionAssessmentList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      /> */}
      <div>Culvert Condition Assessment Page</div>
    </ProjectLayout>
  );
};

CulvertConditionAssessment.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertConditionAssessment;
