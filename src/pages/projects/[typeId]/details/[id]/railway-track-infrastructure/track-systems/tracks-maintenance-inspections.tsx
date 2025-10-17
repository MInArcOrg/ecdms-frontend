import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import RailwayTrackMaintenanceAndInspectionList from 'src/views/pages/projects/detail/other/railway/railway-track-maintenance-inspection';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.trackSystems.tracksMaintenanceInspections);

const TracksMaintenanceInspectionsPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.trackSystems.tracksMaintenanceInspections
  );
  menuItem;
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.trackSystems.tracksMaintenanceInspections}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayTrackMaintenanceAndInspectionList projectId={String(id)} typeId={String(typeId)} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

TracksMaintenanceInspectionsPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TracksMaintenanceInspectionsPage;
