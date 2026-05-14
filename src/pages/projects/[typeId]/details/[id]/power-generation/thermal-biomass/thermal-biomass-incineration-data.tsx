import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import ThermalBiomassIncinerationList from 'src/views/pages/projects/detail/other/electric-power/thermal-biomass-incineration';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.thermalBiomass.thermalBiomassIncinerationData);

const ThermalBiomassIncinerationDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerGenerationIds.thermalBiomass.thermalBiomassIncinerationData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.thermalBiomass.thermalBiomassIncinerationData}
      subMenuItems={subMenuItems}
    >
      <ThermalBiomassIncinerationList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

// Access control configuration
ThermalBiomassIncinerationDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default ThermalBiomassIncinerationDataPage;
