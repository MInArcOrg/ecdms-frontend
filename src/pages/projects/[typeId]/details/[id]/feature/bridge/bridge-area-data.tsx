import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import BridgeAreaDataList from 'src/views/pages/projects/detail/other/road/bridge-area-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeAreaData);

const BridgeAreaData = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeAreaData);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeAreaData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <BridgeAreaDataList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

BridgeAreaData.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeAreaData;