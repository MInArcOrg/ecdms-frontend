import { useRouter } from "next/router";
import ResourceLayout from "src/views/pages/resources/details/layout/resource-layout";
import { resourceMenuIds } from "src/views/pages/resources/details/layout/resource-menu-items";
import subMenuItems, {
  membershipMenuIds,
  findSubMenuItem,
} from "./(sub-menu-items)";
import ResourceProfessionalMembership from "src/views/pages/resources/details/resource-professional-membership";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  membershipMenuIds.membership,
);

const ResourceMembershipPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  // const menuItem = findSubMenuItem(subMenuItems(id as string, typeId as string), membershipMenuIds.membership);

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.membership}
      activeSubMenuId={membershipMenuIds.membership}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ResourceProfessionalMembership
        typeId={String(typeId)}
        professionalId={String(id)}
      />
    </ResourceLayout>
  );
};

// Access control configuration
ResourceMembershipPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ResourceMembershipPage;
