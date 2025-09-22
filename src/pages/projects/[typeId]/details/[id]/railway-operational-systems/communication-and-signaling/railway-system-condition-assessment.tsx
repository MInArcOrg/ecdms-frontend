import { useRouter } from "next/router";
import ProjectLayout from "src/views/pages/projects/detail/layout/project-layout";
import { projectMenuIds } from "src/views/pages/projects/detail/layout/project-menu-items";
import subMenuItems, {
  findSubMenuItem,
  railwayOperationalSystemsIds,
} from "../(subMenuItems)";
import RailwaySystemConditionAssessmentList from "src/views/pages/projects/detail/other/road/railway-system-condition-assessment";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  railwayOperationalSystemsIds.communicationAndSignaling
    .railwaySystemConditionAssessment,
);

const RailwaySystemConditionAssessmentPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    railwayOperationalSystemsIds.communicationAndSignaling
      .railwaySystemConditionAssessment,
  );
  menuItem;

  return (
    <ProjectLayout
      activeMenuId={projectMenuIds.railwayOperationalSystems}
      activeSubMenuId={
        railwayOperationalSystemsIds.communicationAndSignaling
          .railwaySystemConditionAssessment
      }
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <RailwaySystemConditionAssessmentList
        projectId={id as string}
        typeId={typeId as string}
        otherSubMenu={menuItem}
      />
    </ProjectLayout>
  );
};

RailwaySystemConditionAssessmentPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default RailwaySystemConditionAssessmentPage;
