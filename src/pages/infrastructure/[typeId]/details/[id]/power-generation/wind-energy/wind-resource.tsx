import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import WindResourceList from 'src/views/pages/projects/detail/other/electric-power/wind-resource';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.windEnergy.windResource);

const WindResourcePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.windEnergy.windResource);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.windEnergy.windResource}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <WindResourceList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
WindResourcePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default WindResourcePage;
