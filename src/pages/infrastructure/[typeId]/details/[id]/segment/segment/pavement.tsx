import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import PavementList from 'src/views/pages/projects/detail/other/road/pavement';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.segment.pavement);

const Pavement = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.segment.pavement);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.segment.pavement}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <PavementList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
Pavement.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default Pavement;
