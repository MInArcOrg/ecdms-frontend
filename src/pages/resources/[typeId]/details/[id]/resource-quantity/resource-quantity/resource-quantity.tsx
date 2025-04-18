import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import { resourceQuantityMenuIds } from '../(sub-menu-items)';
import subMenuItems, { findSubMenuItem } from '../(sub-menu-items)';
import ResourceQuantityPriceList from 'src/views/pages/resources/details/resource-quantity-price/resource-quantity-price-list';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    resourceMenuIds.quantity
);

const ResourceQuantityPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;


    return (
        <ResourceLayout
            activeMenuId={resourceMenuIds.quantity}
            activeSubMenuId={resourceQuantityMenuIds.resourceQuantity.resourceQuantity}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <>
                <>Resource Quantity List</>
            </>
        </ResourceLayout>
    );
};

// Access control configuration
ResourceQuantityPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default ResourceQuantityPage;