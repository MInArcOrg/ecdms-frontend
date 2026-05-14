import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayPowerSubstationAndEquipmentList from 'src/views/pages/projects/detail/other/road/railway-power-substations-and-equipment';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment
);

const RailwayPowerSubstationsAndEquipmentPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSubstationsAndEquipment}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayPowerSubstationAndEquipmentList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

RailwayPowerSubstationsAndEquipmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayPowerSubstationsAndEquipmentPage;
