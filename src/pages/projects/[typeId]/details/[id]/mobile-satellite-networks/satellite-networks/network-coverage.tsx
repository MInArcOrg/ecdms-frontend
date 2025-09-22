import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  mobileSatelliteNetworksId,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  mobileSatelliteNetworksId.satelliteNetworks.networkCoverage,
);

const SatelliteNetworkCoveragePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  // const menuItem = findSubMenuItem(
  //   subMenuItems(id as string, typeId as string),
  //   mobileSatelliteNetworksId.satelliteNetworks.networkCoverage
  // );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.mobileSatelliteNetworks}
      activeSubMenuId={
        mobileSatelliteNetworksId.satelliteNetworks.networkCoverage
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <SatelliteNetworkCoverageList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
      <>Network coverage</>
    </ProjectLayout>
  );
};

// Access control configuration
SatelliteNetworkCoveragePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default SatelliteNetworkCoveragePage;
