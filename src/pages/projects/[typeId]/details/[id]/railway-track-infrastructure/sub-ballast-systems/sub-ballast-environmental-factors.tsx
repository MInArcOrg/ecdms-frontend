import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastEnvironmentalAndOtherFactorList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-environmental-and-other-factor';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.subBallastSystems.subBallastEnvironmentalFactors
);

const SubBallastEnvironmentalFactorsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastEnvironmentalFactors
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastEnvironmentalFactors}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >

      <RailwaySubBallastEnvironmentalAndOtherFactorList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />

    </ProjectLayout>
  );
};

SubBallastEnvironmentalFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastEnvironmentalFactorsPage;
