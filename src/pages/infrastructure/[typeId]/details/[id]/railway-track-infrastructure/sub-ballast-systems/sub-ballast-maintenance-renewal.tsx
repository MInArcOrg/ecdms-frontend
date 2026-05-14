import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastMaintenanceAndRenewalList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-maintenance-and-renewal';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.subBallastSystems.subBallastMaintenanceRenewal);

const SubBallastMaintenanceRenewalPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastMaintenanceRenewal
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastMaintenanceRenewal}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwaySubBallastMaintenanceAndRenewalList typeId={typeId as string} otherSubMenu={menuItem} projectId={id as string} />
    </ProjectLayout>
  );
};

SubBallastMaintenanceRenewalPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastMaintenanceRenewalPage;
