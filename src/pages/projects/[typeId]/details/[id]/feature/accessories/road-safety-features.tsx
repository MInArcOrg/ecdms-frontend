import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  projectFeatureIds,
} from "../(subMenuItems)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  projectFeatureIds.accessories.roadSafetyFeatures,
);

const RoadSafetyFeatures = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.feature}
      activeSubMenuId={projectFeatureIds.accessories.roadSafetyFeatures}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>Road Safety Features</>
    </ProjectLayout>
  );
};

// Access control configuration
RoadSafetyFeatures.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RoadSafetyFeatures;
