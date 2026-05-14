import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import HydrologicalInformationList from 'src/views/pages/projects/detail/other/water-irrigation/hydrological-information';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.hydropower.hydrologicalInformation);

const HydrologicalInformationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.hydropower.hydrologicalInformation);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.hydropower.hydrologicalInformation}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <HydrologicalInformationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
HydrologicalInformationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default HydrologicalInformationPage;
