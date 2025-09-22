import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  broadcastingDataSystemsId,
} from "../(subMenuItems)";
import DataCenterComponentAgeList from "src/views/pages/projects/detail/other/telecom/data-center-component-age";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  broadcastingDataSystemsId.dataSystems.ageOfDataCenterComponents,
);

const AgeOfDataCenterComponentsPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    broadcastingDataSystemsId.dataSystems.ageOfDataCenterComponents,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={
        broadcastingDataSystemsId.dataSystems.ageOfDataCenterComponents
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <DataCenterComponentAgeList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
AgeOfDataCenterComponentsPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default AgeOfDataCenterComponentsPage;
