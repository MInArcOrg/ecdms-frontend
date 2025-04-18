import { useRouter } from 'next/router';
import ResourceLayout from 'src/views/pages/resources/details/layout/resource-layout';
import { resourceMenuIds } from 'src/views/pages/resources/details/layout/resource-menu-items';
import ResourceSpecificationList from 'src/views/pages/resources/details/resource-specifications/resource-specification-list';
import subMenuItems, { findSubMenuItem, generalInfoMenuIds } from '../(sub-menu-items)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    generalInfoMenuIds.generalInfo.specification
);

const ResourceSpecificationPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;


    return (
        <ResourceLayout
            activeMenuId={resourceMenuIds.generalInfo}
            activeSubMenuId={generalInfoMenuIds.generalInfo.specification}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <>
                <ResourceSpecificationList resourceId={String(id)} />
            </>
        </ResourceLayout>
    );
};

// Access control configuration
ResourceSpecificationPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default ResourceSpecificationPage;