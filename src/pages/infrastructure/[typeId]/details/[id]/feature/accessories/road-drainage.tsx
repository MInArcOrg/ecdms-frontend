import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RoadDrainageList from 'src/views/pages/projects/detail/other/road/road-drainage';
import subMenuItems, { findSubMenuItem, projectFeatureIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectFeatureIds.accessories.roadDrainage);

const RoadDrainage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectFeatureIds.accessories.roadDrainage);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.accessories.roadDrainage}
      subMenuItems={subMenuItems}
    >
      <RoadDrainageList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
RoadDrainage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RoadDrainage;
