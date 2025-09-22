import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayTrackInfrastructureIds,
} from "../(subMenuItems)";
import RailwayBallastList from "src/views/pages/projects/detail/other/road/railway-ballast";
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayTrackInfrastructureIds.ballastSystems.ballast,
);

const BallastPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayTrackInfrastructureIds.ballastSystems.ballast,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayTrackInfrastructure}
      activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballast}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwayBallastList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

BallastPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default BallastPage;
