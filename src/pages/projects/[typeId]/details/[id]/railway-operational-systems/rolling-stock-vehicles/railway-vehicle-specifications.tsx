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
    .railwayVehicleSpecifications,
);

const RailwayVehicleSpecificationsPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.rollingStockVehicles
      .railwayVehicleSpecifications,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={
        railwayOperationalSystemsIds.rollingStockVehicles
          .railwayVehicleSpecifications
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <div>Railway Vehicle Specifications Placeholder</div>
    </ProjectLayout>
  );
};

RailwayVehicleSpecificationsPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RailwayVehicleSpecificationsPage;
