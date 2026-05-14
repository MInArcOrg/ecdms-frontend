import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RailwayBallastMaterialSpecificationList from 'src/views/pages/projects/detail/other/road/railway-ballast-material-specification';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification);

const BallastMaterialSpecificationPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastMaterialSpecification}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwayBallastMaterialSpecificationList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

BallastMaterialSpecificationPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BallastMaterialSpecificationPage;
