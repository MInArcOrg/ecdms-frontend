import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.ballastSystems.ballastDrainageWaterManagement
);

const BallastDrainageWaterManagementPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.ballastSystems.ballastDrainageWaterManagement
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastDrainageWaterManagement}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Ballast Drainage Water Management List Placeholder</div>
        </ProjectLayout>
    );
};

BallastDrainageWaterManagementPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default BallastDrainageWaterManagementPage;