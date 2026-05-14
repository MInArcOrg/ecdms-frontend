import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwaySubBallastDrainageAndWaterManagementList from 'src/views/pages/projects/detail/other/road/railway-sub-ballast-drainage-and-water-management';

const defaultMenuItem = findSubMenuItem(
  subMenuItems('', ''),
  railwayTrackInfrastructureIds.subBallastSystems.subBallastDrainageWaterManagement
);

const SubBallastDrainageWaterManagementPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.subBallastSystems.subBallastDrainageWaterManagement
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.subBallastSystems.subBallastDrainageWaterManagement}
      subMenuItems={subMenuItems(id as string, typeId as string, 'projects')}
    >
      <RailwaySubBallastDrainageAndWaterManagementList projectId={id as string} typeId={typeId as string} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

SubBallastDrainageWaterManagementPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default SubBallastDrainageWaterManagementPage;
