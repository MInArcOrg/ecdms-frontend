import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../feature/(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertConditionAssessment);

const CulvertConditionAssessment = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      {/* <CulvertConditionAssessmentList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
      <>Culvert Condition Assessment</>
    </ProjectLayout>
  );
};

// Access control configuration
CulvertConditionAssessment.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertConditionAssessment;
