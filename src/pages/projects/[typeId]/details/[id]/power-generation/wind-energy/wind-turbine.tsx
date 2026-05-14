import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import WindTurbineList from 'src/views/pages/projects/detail/other/electric-power/wind-turbine';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.windEnergy.windTurbine);

const WindTurbinePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.windEnergy.windTurbine);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.windEnergy.windTurbine}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <WindTurbineList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
WindTurbinePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default WindTurbinePage;
