import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';
import IntersectionDrivewayList from 'src/views/pages/projects/detail/other/road/intersection-and-driveway';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.segment.roadSegment);

const RoadSegment = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.segment.roadSegment);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.segment.roadSegment}
      subMenuItems={subMenuItems}
    >
      <IntersectionDrivewayList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
RoadSegment.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RoadSegment;
