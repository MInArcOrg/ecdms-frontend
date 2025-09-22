import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayOperationalSystemsIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayOperationalSystemsIds.powerSystems
    .railwayPowerSupplyMaintenanceAndTesting,
);

const RailwayPowerSupplyMaintenanceAndTestingPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.powerSystems
      .railwayPowerSupplyMaintenanceAndTesting,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={
        railwayOperationalSystemsIds.powerSystems
          .railwayPowerSupplyMaintenanceAndTesting
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Power Supply Maintenance and Testing Placeholder</div>
    </ProjectLayout>
  );
};

RailwayPowerSupplyMaintenanceAndTestingPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RailwayPowerSupplyMaintenanceAndTestingPage;
