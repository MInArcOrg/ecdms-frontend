import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import ResourcePriceList from 'src/views/pages/resources/details/resource-price/resource-price-list';
import subMenuItems, { findSubMenuItem, resourcePriceMenuIds } from '../(sub-menu-items)';

const defaultMenuItem = findSubMenuItem(subMenuItems('', ''), resourcePriceMenuIds.resourcePrice.resourcePrice);

const ResourcePricePage = () => {
  const router = useRouter();
  const { id = '', typeId = '' } = router.query;

  return (
    <ResourceLayout
      activeMenuId={resourceMenuIds.price}
      activeSubMenuId={resourcePriceMenuIds.resourcePrice.resourcePrice}
      subMenuItems={subMenuItems(id as string, typeId as string)}
    >
      <ResourcePriceList resourceId={id as string} />
    </ResourceLayout>
  );
};

// Access control configuration
ResourcePricePage.acl = {
  subject: defaultMenuItem?.model,
  action: 'view'
};
export default ResourcePricePage;
