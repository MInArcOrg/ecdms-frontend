import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, broadcastingDataSystemsId } from '../(subMenuItems)';
import BroadcastingInfrastructureAgeList from 'src/views/pages/projects/detail/other/telecom/broadcasting-infrastructure-age';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    broadcastingDataSystemsId.broadcasting.ageOfBroadcastingInfrastructure
);

const AgeOfBroadcastingInfrastructurePage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        broadcastingDataSystemsId.broadcasting.ageOfBroadcastingInfrastructure
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.broadcastingDataSystems}
            activeSubMenuId={broadcastingDataSystemsId.broadcasting.ageOfBroadcastingInfrastructure}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <BroadcastingInfrastructureAgeList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
AgeOfBroadcastingInfrastructurePage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default AgeOfBroadcastingInfrastructurePage;