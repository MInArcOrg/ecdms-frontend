import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySleeperCharacteristicList from 'src/views/pages/projects/detail/other/road/railway-sleeper-characteristic';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperCharacteristics
);

const SleeperCharacteristicsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperCharacteristics
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperCharacteristics}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwaySleeperCharacteristicList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SleeperCharacteristicsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SleeperCharacteristicsPage;
