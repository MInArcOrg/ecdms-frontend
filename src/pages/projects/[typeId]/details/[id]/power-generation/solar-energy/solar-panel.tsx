import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import SolarPanelList from 'src/views/pages/projects/detail/other/electric-power/solar-panel';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.solarEnergy.solarPanel);

const SolarPanelPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.solarEnergy.solarPanel);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.solarEnergy.solarPanel}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <SolarPanelList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SolarPanelPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SolarPanelPage;
