import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  regulationIds,
} from "../(subMenuItems)";
import ReliabilityAndMaintenanceList from "src/views/pages/projects/detail/other/electric-power/reliability-and-maintenance";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  regulationIds.maintenanceAndReliability.reliabilityAndMaintenance,
);

const ReliabilityAndMaintenancePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    regulationIds.maintenanceAndReliability.reliabilityAndMaintenance,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={
        regulationIds.maintenanceAndReliability.reliabilityAndMaintenance
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ReliabilityAndMaintenanceList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
ReliabilityAndMaintenancePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ReliabilityAndMaintenancePage;
