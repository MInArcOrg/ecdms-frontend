import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastMaterialTestList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-material-test';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterialTest);

const SubBallastMaterialTestPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterialTest
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterialTest}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwaySubBallastMaterialTestList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SubBallastMaterialTestPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastMaterialTestPage;
