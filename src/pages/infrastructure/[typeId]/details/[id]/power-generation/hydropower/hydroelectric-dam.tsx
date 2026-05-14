import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import HydroElectricDamList from 'src/views/pages/projects/detail/other/electric-power/hydro-electric-dam';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.hydropower.hydroelectricDam);

const HydroelectricDamPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.hydropower.hydroelectricDam);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.hydropower.hydroelectricDam}
      subMenuItems={subMenuItems}
    >
      <HydroElectricDamList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
HydroelectricDamPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default HydroelectricDamPage;
