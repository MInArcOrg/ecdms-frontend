import { useRouter } from "next/router";
import ResourceLayout from "src/views/pages/resources/details/layout/resource-layout";
import { resourceMenuIds } from "src/views/pages/resources/details/layout/resource-menu-items";
import ResourceEducationList from "src/views/pages/resources/details/resource-professional-education";
import subMenuItems, {
  educationMenuIds,
  findSubMenuItem,
} from "./(sub-menu-items)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  educationMenuIds.education,
);

const ResourceEducationPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  const menuItem = findSubMenuItem(
    subMenuItems(id as string, typeId as string),
    educationMenuIds.education,
  );

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.education}
      activeSubMenuId={educationMenuIds.education}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ResourceEducationList
        otherSubMenu={menuItem}
        typeId={String(typeId)}
        professionalId={String(id)}
      />
    </ResourceLayout>
  );
};

// Access control configuration
ResourceEducationPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ResourceEducationPage;
