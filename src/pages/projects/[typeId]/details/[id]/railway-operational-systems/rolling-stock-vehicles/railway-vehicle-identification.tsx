import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayRollingStockTechnicalSpecsList from 'src/views/pages/projects/detail/other/road/railway-vehicle-identification';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleIdentification
);

const RailwayVehicleIdentificationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleIdentification
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.rollingStockVehicles.railwayVehicleIdentification}
      subMenuItems={subMenuItems}
    >
      <RailwayRollingStockTechnicalSpecsList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

RailwayVehicleIdentificationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayVehicleIdentificationPage;
