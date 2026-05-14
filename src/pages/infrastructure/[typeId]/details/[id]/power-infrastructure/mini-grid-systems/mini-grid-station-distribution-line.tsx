import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import MiniGridStationDistributionLineList from 'src/views/pages/projects/detail/other/electric-power/mini-grid-station-distribution-line';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLine);

const MiniGridStationDistributionLinePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLine
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLine}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <MiniGridStationDistributionLineList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MiniGridStationDistributionLinePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MiniGridStationDistributionLinePage;
