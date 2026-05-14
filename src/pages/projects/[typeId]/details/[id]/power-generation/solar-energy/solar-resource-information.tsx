import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import SolarResourceInformationList from 'src/views/pages/projects/detail/other/electric-power/solar-resource-information';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.solarEnergy.solarResourceInformation);

const SolarResourceInformationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.solarEnergy.solarResourceInformation);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.solarEnergy.solarResourceInformation}
      subMenuItems={subMenuItems}
    >
      <SolarResourceInformationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SolarResourceInformationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SolarResourceInformationPage;
