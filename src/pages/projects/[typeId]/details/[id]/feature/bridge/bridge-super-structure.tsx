import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import BridgeSuperStructureList from 'src/views/pages/projects/detail/other/road/bridge-super-structure';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeSuperStructure);

const BridgeSuperStructure = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeSuperStructure);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeSuperStructure}
      subMenuItems={subMenuItems}
    >
      <BridgeSuperStructureList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

BridgeSuperStructure.acl = {  
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeSuperStructure;
