import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySleeperEnvironmentalAndOtherFactorList from 'src/views/pages/projects/detail/other/road/railway-sleeper-environmental-and-other-factor';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperEnvironmentalFactors
);

const SleeperEnvironmentalFactorsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperEnvironmentalFactors
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.sleeperAndFasteningSystems.sleeperEnvironmentalFactors}
      subMenuItems={subMenuItems}
    >
      <RailwaySleeperEnvironmentalAndOtherFactorList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SleeperEnvironmentalFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SleeperEnvironmentalFactorsPage;
