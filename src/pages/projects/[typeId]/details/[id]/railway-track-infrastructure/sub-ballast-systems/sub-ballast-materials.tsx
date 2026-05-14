import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastMaterialList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-material';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials);

const SubBallastMaterialsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastMaterials}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwaySubBallastMaterialList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SubBallastMaterialsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastMaterialsPage;
