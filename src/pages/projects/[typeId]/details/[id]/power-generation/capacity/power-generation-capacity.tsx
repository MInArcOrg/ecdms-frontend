import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import PowerGenerationCapacityList from 'src/views/pages/projects/detail/other/electric-power/power-generation-capacity';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerGenerationIds.capacity.powerGenerationCapacity);

const PowerGenerationCapacityPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerGenerationIds.capacity.powerGenerationCapacity);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerGeneration}
      activeSubMenuId={powerGenerationIds.capacity.powerGenerationCapacity}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <PowerGenerationCapacityList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
PowerGenerationCapacityPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default PowerGenerationCapacityPage;
