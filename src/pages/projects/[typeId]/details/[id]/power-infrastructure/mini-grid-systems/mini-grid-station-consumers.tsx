import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import MiniGridStationConsumerList from 'src/views/pages/projects/detail/other/electric-power/mini-grid-station-consumer';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    powerInfrastructureIds.miniGridSystems.miniGridStationConsumers
);

const MiniGridStationConsumersPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        powerInfrastructureIds.miniGridSystems.miniGridStationConsumers
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.powerInfrastructure}
            activeSubMenuId={powerInfrastructureIds.miniGridSystems.miniGridStationConsumers}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <MiniGridStationConsumerList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
MiniGridStationConsumersPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default MiniGridStationConsumersPage;