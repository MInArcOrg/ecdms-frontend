import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectMaintenanceIds.maintenance.drainageMaintenanceData
);

const DrainageMaintenanceData = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectMaintenanceIds.maintenance.drainageMaintenanceData
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.maintenance}
            activeSubMenuId={projectMaintenanceIds.maintenance.drainageMaintenanceData}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            {/* <DrainageMaintenance
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            /> */}
            <>
                Drainage Maintenance Data
            </>
        </ProjectLayout>
    );
};

// Access control configuration
DrainageMaintenanceData.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default DrainageMaintenanceData;