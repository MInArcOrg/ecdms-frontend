import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import BridgeComponentsAncillariesList from 'src/views/pages/projects/detail/other/road/bridge-components-ancillaries';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeComponentsAncillaries);

const BridgeComponentsAncillaries = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeComponentsAncillaries);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeComponentsAncillaries}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <BridgeComponentsAncillariesList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

BridgeComponentsAncillaries.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeComponentsAncillaries;
