import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  projectMaintenanceIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  projectMaintenanceIds.maintenance.trafficMaintenance,
);

const TrafficMaintenance = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.maintenance}
      activeSubMenuId={projectMaintenanceIds.maintenance.trafficMaintenance}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <TrafficMaintenanceList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
      <>Traffic Maintenance</>
    </ProjectLayout>
  );
};

// Access control configuration
TrafficMaintenance.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default TrafficMaintenance;
