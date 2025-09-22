import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayOperationalSystemsIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayOperationalSystemsIds.rollingStockVehicles
    .railwayVehicleSafetyAndCompliance,
);

const RailwayVehicleSafetyAndCompliancePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles
      .railwayVehicleSafetyAndCompliance,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={
        railwayOperationalSystemsIds.rollingStockVehicles
          .railwayVehicleSafetyAndCompliance
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Vehicle Safety and Compliance Placeholder</div>
    </ProjectLayout>
  );
};

RailwayVehicleSafetyAndCompliancePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RailwayVehicleSafetyAndCompliancePage;
