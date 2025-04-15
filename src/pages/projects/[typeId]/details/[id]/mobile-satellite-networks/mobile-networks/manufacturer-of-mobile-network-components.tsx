import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, mobileSatelliteNetworksId } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    mobileSatelliteNetworksId.mobileNetworks.manufacturerOfMobileNetworkComponents
);

const ManufacturerOfMobileNetworkComponentsPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        mobileSatelliteNetworksId.mobileNetworks.manufacturerOfMobileNetworkComponents
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.mobileSatelliteNetworks}
            activeSubMenuId={mobileSatelliteNetworksId.mobileNetworks.manufacturerOfMobileNetworkComponents}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            {/* <ManufacturerOfMobileNetworkComponentsList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
            <>Manufacturere of Mobile Network component</>
        </ProjectLayout>
    );
};

// Access control configuration
ManufacturerOfMobileNetworkComponentsPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default ManufacturerOfMobileNetworkComponentsPage;