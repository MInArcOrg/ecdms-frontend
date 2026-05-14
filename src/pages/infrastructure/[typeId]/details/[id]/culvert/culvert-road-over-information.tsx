import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import CulvertRoadOverInformationList from 'src/views/pages/projects/detail/other/road/culvert-road-over-information';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../feature/(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.culvert.culvertRoadOverInformation);

const CulvertRoadOverInformation = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.culvert.culvertRoadOverInformation);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.culvert.culvertRoadOverInformation}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <CulvertRoadOverInformationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
CulvertRoadOverInformation.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default CulvertRoadOverInformation;
