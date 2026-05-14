import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectSegmentIds } from '../(subMenuItems)';
import TrafficVolumeList from 'src/views/pages/projects/detail/other/road/traffic-volume';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), projectSegmentIds.segment.trafficVolume);

const TrafficVolume = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), projectSegmentIds.segment.trafficVolume);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.segment}
      activeSubMenuId={projectSegmentIds.segment.trafficVolume}
      subMenuItems={subMenuItems}
    >
      <TrafficVolumeList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
TrafficVolume.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TrafficVolume;
