import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import BridgeBasicDataList from 'src/views/pages/projects/detail/other/road/bridge-basic-data';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeBasicData);

const BridgeBasicData = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeBasicData);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeBasicData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <BridgeBasicDataList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

BridgeBasicData.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeBasicData;
