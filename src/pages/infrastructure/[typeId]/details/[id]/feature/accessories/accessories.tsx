import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';
import AccessoryList from 'src/views/pages/projects/detail/other/road/accessory';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.accessories.accessories);

const Accessories = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.accessories.accessories);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.accessories.accessories}
      subMenuItems={subMenuItems}
    >
      <AccessoryList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
Accessories.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default Accessories;
