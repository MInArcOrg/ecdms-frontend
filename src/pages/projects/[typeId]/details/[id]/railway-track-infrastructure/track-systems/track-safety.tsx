import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayTrackInfrastructureIds } from '../(subMenuItems)';
// Placeholder import, replace with actual component when available

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayTrackInfrastructureIds.trackSystems.trackSafety
);

const TrackSafetyPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayTrackInfrastructureIds.trackSystems.trackSafety
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayTrackInfrastructure}
            activeSubMenuId={railwayTrackInfrastructureIds.trackSystems.trackSafety}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Track Safety List Placeholder</div>;
        </ProjectLayout>
    );
};

TrackSafetyPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default TrackSafetyPage;