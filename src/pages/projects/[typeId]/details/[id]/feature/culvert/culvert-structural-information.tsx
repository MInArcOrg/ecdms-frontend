import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import CulvertStructuralInformationList from 'src/views/pages/projects/detail/other/road/culvert-structural-information';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertStructuralData);

const CulvertStructuralInformation = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.culvert.culvertStructuralData);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertStructuralData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      {/* <div>Culvert Structural Information Page</div> */}
      <CulvertStructuralInformationList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

CulvertStructuralInformation.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertStructuralInformation;
