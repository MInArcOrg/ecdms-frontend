import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import NetworkCoverageList from "src/views/pages/projects/detail/other/telecom/network-coverage";
import subMenuItems, {
  findSubMenuItem,
  telecomInfrastructureId,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  telecomInfrastructureId.telecom.networkCoverage,
);

const NetworkCoverage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    telecomInfrastructureId.telecom.networkCoverage,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.telecomInfrastructure}
      activeSubMenuId={telecomInfrastructureId.telecom.networkCoverage}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <NetworkCoverageList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
NetworkCoverage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default NetworkCoverage;
