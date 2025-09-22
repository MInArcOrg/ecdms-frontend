import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  broadcastingDataSystemsId,
} from "../(subMenuItems)";
import EnvironmentalControlList from "src/views/pages/projects/detail/other/telecom/environmental-control";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  broadcastingDataSystemsId.dataSystems.environmentalControl,
);

const EnvironmentalControlPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    broadcastingDataSystemsId.dataSystems.environmentalControl,
  );

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.broadcastingDataSystems}
      activeSubMenuId={
        broadcastingDataSystemsId.dataSystems.environmentalControl
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <EnvironmentalControlList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        projectId={String(id)}
      />
    </ProjectLayout>
  );
};

// Access control configuration
EnvironmentalControlPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default EnvironmentalControlPage;
