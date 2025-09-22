import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  projectFeatureIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  projectFeatureIds.accessories.drainageGeotechnicalData,
);

const DrainageGeotechnicalData = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.accessories.drainageGeotechnicalData}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      {/* <DrainageGeotechnicalData
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
      <>Drainage geothechnical data</>
    </ProjectLayout>
  );
};

// Access control configuration
DrainageGeotechnicalData.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default DrainageGeotechnicalData;
