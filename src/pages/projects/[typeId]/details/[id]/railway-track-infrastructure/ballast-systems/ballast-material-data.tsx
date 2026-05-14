import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwayBallastMaterialDataList from 'src/views/pages/projects/detail/other/road/railway-ballast-material-data';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.ballastSystems.ballastMaterialData);

const BallastMaterialDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.ballastSystems.ballastMaterialData
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastMaterialData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwayBallastMaterialDataList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

BallastMaterialDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default BallastMaterialDataPage;
