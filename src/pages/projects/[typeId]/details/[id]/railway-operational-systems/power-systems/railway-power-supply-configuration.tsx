import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyConfiguration
);

const RailwayPowerSupplyConfigurationPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyConfiguration
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayOperationalSystems}
            activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyConfiguration}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Railway Power Supply Configuration Placeholder</div>
        </ProjectLayout>
    );
};

RailwayPowerSupplyConfigurationPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RailwayPowerSupplyConfigurationPage;