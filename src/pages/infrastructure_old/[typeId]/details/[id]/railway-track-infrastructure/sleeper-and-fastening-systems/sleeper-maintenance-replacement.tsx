import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySleeperMaintenanceAndReplacementList from 'src/views/pages/projects/detail/other/road/railway-sleeper-maintenance-and-replacement';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperMaintenanceReplacement
);

const SleeperMaintenanceReplacementPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperMaintenanceReplacement
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperMaintenanceReplacement}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwaySleeperMaintenanceAndReplacementList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SleeperMaintenanceReplacementPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SleeperMaintenanceReplacementPage;
