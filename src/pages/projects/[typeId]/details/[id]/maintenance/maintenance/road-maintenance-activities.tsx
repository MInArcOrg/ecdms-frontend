import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';
import RoadMaintenanceActivityList from 'src/views/pages/projects/detail/other/road/road-maintenance-activity';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectMaintenanceIds.maintenance.roadMaintenance
);

const RoadMaintenanceActivities = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectMaintenanceIds.maintenance.roadMaintenance
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.maintenance}
            activeSubMenuId={projectMaintenanceIds.maintenance.roadMaintenance}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <RoadMaintenanceActivityList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
RoadMaintenanceActivities.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RoadMaintenanceActivities;