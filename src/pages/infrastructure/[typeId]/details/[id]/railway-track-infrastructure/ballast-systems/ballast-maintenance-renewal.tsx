import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwayBallastMaintenanceAndRenewalList from 'src/views/pages/projects/detail/other/road/railway-ballast-maintenance-and-renewal';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal);

const BallastMaintenanceRenewalPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayBallastMaintenanceAndRenewalList typeId={typeId as string} otherSubMenu={menuItem} projectId={id as string} />
    </ProjectLayout>
  );
};

BallastMaintenanceRenewalPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BallastMaintenanceRenewalPage;
