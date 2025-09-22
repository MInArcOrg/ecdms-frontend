import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayTrackInfrastructureIds,
} from "../(subMenuItems)";
import RailwayTrackDataList from "src/views/pages/projects/detail/other/railway/railway-track-data";
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayTrackInfrastructureIds.trackSystems.tracksData,
);

const TrackDataPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.trackSystems.tracksData,
  );
  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.trackSystems.tracksData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayTrackDataList
        projectId={String(id)}
        typeId={String(typeId)}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

TrackDataPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default TrackDataPage;
