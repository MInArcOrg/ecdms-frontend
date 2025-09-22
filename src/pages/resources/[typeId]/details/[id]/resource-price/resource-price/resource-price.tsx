import { useRouter } from "next/router";
import ResourceLayout from "src/views/pages/resources/details/layout/resource-layout";
import { resourceMenuIds } from "src/views/pages/resources/details/layout/resource-menu-items";
import subMenuItems, {
  findSubMenuItem,
  resourcePriceMenuIds,
} from "../(sub-menu-items)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  resourceMenuIds.price,
);

const ResourcePricePage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.price}
      activeSubMenuId={resourcePriceMenuIds.resourcePrice.resourcePrice}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>Resource Price Page Containe</>
    </ResourceLayout>
  );
};

// Access control configuration
ResourcePricePage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ResourcePricePage;
