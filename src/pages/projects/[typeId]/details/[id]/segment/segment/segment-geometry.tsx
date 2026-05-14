import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';
import SegmentGeometryList from 'src/views/pages/projects/detail/other/road/segment-geometry';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.segment.segmentGeometry);

const SegmentGeometry = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.segment.segmentGeometry);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.segment.segmentGeometry}
      subMenuItems={subMenuItems}
    >
      <SegmentGeometryList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
SegmentGeometry.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SegmentGeometry;
