import { useRouter } from "next/router";
import ResourceLayout from "src/views/pages/resources/details/layout/resource-layout";
import { resourceMenuIds } from "src/views/pages/resources/details/layout/resource-menu-items";
import ResourceBrandList from "src/views/pages/resources/details/resource-brands/resource-brand-list";
import subMenuItems, {
  findSubMenuItem,
  generalInfoMenuIds,
} from "../(sub-menu-items)";

const defaultMenuItem = findSubMenuItem(
  subMenuItems("", ""),
  generalInfoMenuIds.generalInfo.brands,
);

const ResourceBrandPage = () => {
  const router = useRouter();
  const { id = "", typeId = "" } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.generalInfo}
      activeSubMenuId={generalInfoMenuIds.generalInfo.brands}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <>
        <ResourceBrandList resourceId={String(id)} />
      </>
    </ResourceLayout>
  );
};

// Access control configuration
ResourceBrandPage.acl = {
  subject: defaultMenuItem?.model,
  action: "view",
};

export default ResourceBrandPage;
