import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  powerInfrastructureIds,
} from "../(subMenuItems)";
import ElectricDistributionTransformerTypeList from "src/views/pages/projects/detail/other/electric-power/electric-distribution-transformer-type";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  powerInfrastructureIds.distributionSystems
    .electricDistributionTransformerType,
);

const ElectricDistributionTransformerTypePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    powerInfrastructureIds.distributionSystems
      .electricDistributionTransformerType,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.powerInfrastructure}
      activeSubMenuId={
        powerInfrastructureIds.distributionSystems
          .electricDistributionTransformerType
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ElectricDistributionTransformerTypeList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
ElectricDistributionTransformerTypePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ElectricDistributionTransformerTypePage;
