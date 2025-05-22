import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal
);

const BallastMaintenanceRenewalPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballastMaintenanceRenewal}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Ballast Maintenance Renewal List Placeholder</div>
        </ProjectLayout>
    );
};

BallastMaintenanceRenewalPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default BallastMaintenanceRenewalPage;