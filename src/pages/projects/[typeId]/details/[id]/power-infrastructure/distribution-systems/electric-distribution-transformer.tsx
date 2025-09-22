import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  powerInfrastructureIds,
} from "../(subMenuItems)";
import ElectricDistributionTransformerList from "src/views/pages/projects/detail/other/electric-power/electric-distribution-transformer";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  powerInfrastructureIds.distributionSystems.electricDistributionTransformer,
);

const ElectricDistributionTransformerPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.distributionSystems.electricDistributionTransformer,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={
        powerInfrastructureIds.distributionSystems
          .electricDistributionTransformer
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ElectricDistributionTransformerList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricDistributionTransformerPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ElectricDistributionTransformerPage;
