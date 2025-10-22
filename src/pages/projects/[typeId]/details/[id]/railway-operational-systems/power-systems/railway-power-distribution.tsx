import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayPowerDistributionList from 'src/views/pages/projects/detail/other/road/railway-power-distribution';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution);

const RailwayPowerDistributionPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerDistribution}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayPowerDistributionList otherSubMenu={menuItem} projectId={id as string} typeId={typeId as string} />
    </ProjectLayout>
  );
};

RailwayPowerDistributionPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayPowerDistributionPage;
