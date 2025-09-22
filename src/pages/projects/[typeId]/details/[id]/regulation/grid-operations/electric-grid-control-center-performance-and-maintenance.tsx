import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  regulationIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  regulationIds.gridOperations
    .electricGridControlCenterPerformanceAndMaintenance,
);

const ElectricGridControlCenterPerformanceAndMaintenancePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  // const menuItem = findSubMenuItem(
  //   subMenuItems(id as string, typeId as string),
  //   regulationIds.gridOperations.electricGridControlCenterPerformanceAndMaintenance
  // );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={
        regulationIds.gridOperations
          .electricGridControlCenterPerformanceAndMaintenance
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>Electric Grid Control Center Performance and Maintenance</>
    </ProjectLayout>
  );
};

// Access control configuration
ElectricGridControlCenterPerformanceAndMaintenancePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ElectricGridControlCenterPerformanceAndMaintenancePage;
