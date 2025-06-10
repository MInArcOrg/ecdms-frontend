import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySleeperCharacteristicList from 'src/views/pages/projects/detail/other/road/railway-sleeper-characteristic';
import RailwayFasteningSystemCharacteristicList from 'src/views/pages/projects/detail/other/road/railway-fastening-system-characteristic';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemCharacteristics
);

const FasteningSystemCharacteristicsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemCharacteristics
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.fasteningSystemCharacteristics}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayFasteningSystemCharacteristicList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

FasteningSystemCharacteristicsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default FasteningSystemCharacteristicsPage;
