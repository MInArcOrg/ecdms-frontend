import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import BroadcastingInfrastructureList from 'src/views/pages/projects/detail/other/telecom/broadcasting-infrastructure';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    broadcastingDataSystemsId.broadcasting.broadcastingInfrastructure
);

const BroadcastingInfrastructurePage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        broadcastingDataSystemsId.broadcasting.broadcastingInfrastructure
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.broadcastingDataSystems}
            activeSubMenuId={broadcastingDataSystemsId.broadcasting.broadcastingInfrastructure}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <BroadcastingInfrastructureList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
BroadcastingInfrastructurePage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default BroadcastingInfrastructurePage;