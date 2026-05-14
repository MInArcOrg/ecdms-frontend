import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import MiniGridStationBackupPowerSourceList from 'src/views/pages/projects/detail/other/electric-power/mini-grid-station-backup-power-source';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.miniGridSystems.miniGridStationBackupPowerSource);

const MiniGridStationBackupPowerSourcePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.miniGridSystems.miniGridStationBackupPowerSource
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.miniGridSystems.miniGridStationBackupPowerSource}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <MiniGridStationBackupPowerSourceList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MiniGridStationBackupPowerSourcePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MiniGridStationBackupPowerSourcePage;
