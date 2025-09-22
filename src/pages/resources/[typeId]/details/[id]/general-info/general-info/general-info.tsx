import { useRouter } from "next/router";
import ResourceLayout from "src/views/pages/resources/details/layout/resource-layout";
import { resourceMenuIds } from "src/views/pages/resources/details/layout/resource-menu-items";
import subMenuItems, {
  findSubMenuItem,
  generalInfoMenuIds,
} from "../(sub-menu-items)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  generalInfoMenuIds.generalInfo.generalInfo,
);

const GeneralInfoPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.generalInfo}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <></>
    </ResourceLayout>
  );
};

// Access control configuration
GeneralInfoPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default GeneralInfoPage;
