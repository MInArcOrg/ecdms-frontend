import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import BridgeSubStructureList from 'src/views/pages/projects/detail/other/road/bridge-sub-structure';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeSubStructure);

const BridgeSubStructure = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeSubStructure);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeSubStructure}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <BridgeSubStructureList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

BridgeSubStructure.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeSubStructure;