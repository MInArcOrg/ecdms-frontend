import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, projectMaintenanceIds } from '../(subMenuItems)';
import RoadProjectQualityControlCard from 'src/views/pages/projects/detail/other/road/road-project-quality-control/road-project-quality-control-card';
import RoadProjectQualityControlList from 'src/views/pages/projects/detail/other/road/road-project-quality-control';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    projectMaintenanceIds.quality.qualityControl
);

const QualityControl = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        projectMaintenanceIds.quality.qualityControl
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.maintenance}
            activeSubMenuId={projectMaintenanceIds.quality.qualityControl}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <RoadProjectQualityControlList otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)} />
        </ProjectLayout>
    );
};

// Access control configuration
QualityControl.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default QualityControl;