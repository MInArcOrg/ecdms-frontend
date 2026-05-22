import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';
import SegmentCoordinateList from 'src/views/pages/projects/detail/other/road/segment-coordinate';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.segment.segmentCoordinates);

const SegmentCoordinates = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.segment.segmentCoordinates);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.segment.segmentCoordinates}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <SegmentCoordinateList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SegmentCoordinates.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SegmentCoordinates;
