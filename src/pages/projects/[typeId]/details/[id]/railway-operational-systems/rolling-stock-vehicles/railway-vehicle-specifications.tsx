import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayOperationalSystemsIds,
} from "../(subMenuItems)";
import RailwayVehicleSpecificationList from "src/views/pages/projects/detail/other/road/railway-vehicle-specification";

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
      <RailwayVehicleSpecificationList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

RailwayVehicleSpecificationsPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RailwayVehicleSpecificationsPage;
