import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import MiniGridStationList from 'src/views/pages/projects/detail/other/electric-power/mini-grid-station';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), powerInfrastructureIds.miniGridSystems.miniGridStation);

const MiniGridStationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), powerInfrastructureIds.miniGridSystems.miniGridStation);

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={powerInfrastructureIds.miniGridSystems.miniGridStation}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <MiniGridStationList otherSubMenu={menuItem} typeId={String(typeId)} projectId={String(id)} />
    </ProjectLayout>
  );
};

// Access control configuration
MiniGridStationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default MiniGridStationPage;
