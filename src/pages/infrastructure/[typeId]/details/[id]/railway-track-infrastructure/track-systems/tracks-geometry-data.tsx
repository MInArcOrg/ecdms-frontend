import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
import RailwayTracksGeometryDataList from 'src/views/pages/projects/detail/other/railway/railway-tracks-geometry-data';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), railwayTrackInfrastructureIds.trackSystems.tracksGeometryData);

const TracksGeometryDataPage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.trackSystems.tracksGeometryData
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.trackSystems.tracksGeometryData}
      subMenuItems={subMenuItems(id as string, typeId as string, 'infrastructure')}
    >
      <RailwayTracksGeometryDataList projectId={String(id)} typeId={String(typeId)} otherSubMenu={menuItem} />
    </ProjectLayout>
  );
};

TracksGeometryDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};

export default TracksGeometryDataPage;
