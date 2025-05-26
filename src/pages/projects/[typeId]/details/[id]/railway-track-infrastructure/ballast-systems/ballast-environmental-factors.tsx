import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.ballastSystems.ballastEnvironmentalFactors);

const BallastEnvironmentalFactorsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.ballastSystems.ballastEnvironmentalFactors
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastEnvironmentalFactors}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Ballast Environmental Factors List Placeholder</div>
    </ProjectLayout>
  );
};

BallastEnvironmentalFactorsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BallastEnvironmentalFactorsPage;
