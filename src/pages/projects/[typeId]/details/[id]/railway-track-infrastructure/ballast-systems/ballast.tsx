import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.ballastSystems.ballast
);

const BallastPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.ballastSystems.ballast
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.ballastSystems.ballast}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Ballast List Placeholder</div>
        </ProjectLayout>
    );
};

BallastPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default BallastPage;