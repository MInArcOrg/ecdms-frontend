import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import GeothermalPowerInfrastructureList from 'src/views/pages/projects/detail/other/electric-power/geothermal-power-infrastructure';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.geothermalEnergy.geothermalPowerInfrastructure);

const GeothermalPowerInfrastructurePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerGenerationIds.geothermalEnergy.geothermalPowerInfrastructure
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.geothermalEnergy.geothermalPowerInfrastructure}
      subMenuItems={subMenuItems}
    >
      <GeothermalPowerInfrastructureList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
GeothermalPowerInfrastructurePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default GeothermalPowerInfrastructurePage;
