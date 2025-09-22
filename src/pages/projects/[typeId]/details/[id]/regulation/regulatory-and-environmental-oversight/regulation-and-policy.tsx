import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  regulationIds,
} from "../(subMenuItems)";
import RegulationAndPolicyList from "src/views/pages/projects/detail/other/electric-power/regulation-and-policy";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  regulationIds.regulatoryAndEnvironmentalOversight.regulationAndPolicy,
);

const RegulationAndPolicyPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    regulationIds.regulatoryAndEnvironmentalOversight.regulationAndPolicy,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.regulation}
      activeSubMenuId={
        regulationIds.regulatoryAndEnvironmentalOversight.regulationAndPolicy
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RegulationAndPolicyList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
RegulationAndPolicyPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RegulationAndPolicyPage;
