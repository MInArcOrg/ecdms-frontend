import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import CulvertConditionAssessmentList from 'src/views/pages/projects/detail/other/road/culvert-condition-assessment';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertConditionAssessment);

const CulvertConditionAssessment = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.culvert.culvertConditionAssessment);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertConditionAssessment}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <CulvertConditionAssessmentList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

CulvertConditionAssessment.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertConditionAssessment;
