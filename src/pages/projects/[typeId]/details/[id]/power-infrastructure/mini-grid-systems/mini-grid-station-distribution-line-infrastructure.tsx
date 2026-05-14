import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import MiniGridStationDistributionLineInfrastructureList from 'src/views/pages/projects/detail/other/electric-power/mini-grid-station-distribution-line-infrastructure';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLineInfrastructure
);

const MiniGridStationDistributionLineInfrastructurePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLineInfrastructure
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.miniGridSystems.miniGridStationDistributionLineInfrastructure}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <MiniGridStationDistributionLineInfrastructureList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MiniGridStationDistributionLineInfrastructurePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MiniGridStationDistributionLineInfrastructurePage;
