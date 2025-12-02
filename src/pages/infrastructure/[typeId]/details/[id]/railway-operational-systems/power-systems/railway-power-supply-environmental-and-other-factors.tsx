import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';
import RailwayPowerSupplyEnvironmentalAndOtherFactorList from 'src/views/pages/projects/detail/other/road/railway-power-supply-environmental-and-other-factor';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors
);

const RailwayPowerSupplyEnvironmentalAndOtherFactorsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayPowerSupplyEnvironmentalAndOtherFactorList
        otherSubMenu={menuItem}
        projectId={id as string}
        typeId={typeId as string}
      />

    </ProjectLayout>
  );
};

RailwayPowerSupplyEnvironmentalAndOtherFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default RailwayPowerSupplyEnvironmentalAndOtherFactorsPage;
