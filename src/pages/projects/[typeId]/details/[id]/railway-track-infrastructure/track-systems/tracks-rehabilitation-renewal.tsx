import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayTrackInfrastructureIds,
} from "../(subMenuItems)";
import RailwayTrackRehabilitationOrRenewalList from "src/views/pages/projects/detail/other/road/railway-track-rehabilitation-or-renewal";
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayTrackInfrastructureIds.trackSystems.tracksRehabilitationRenewal,
);

const TracksRehabilitationRenewalPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.trackSystems.tracksRehabilitationRenewal,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={
        railwayTrackInfrastructureIds.trackSystems.tracksRehabilitationRenewal
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayTrackRehabilitationOrRenewalList
        projectId={String(id)}
        typeId={String(typeId)}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

TracksRehabilitationRenewalPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default TracksRehabilitationRenewalPage;
