import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.bridge.bridgeComponentsAncillaries);

const BridgeComponentsAncillaries = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.bridge.bridgeComponentsAncillaries);
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.bridge.bridgeComponentsAncillaries}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <BridgeComponentsAncillariesList


      /> */}
      <>Bridge Components and Ancillaries</>
    </ProjectLayout>
  );
};

BridgeComponentsAncillaries.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BridgeComponentsAncillaries;