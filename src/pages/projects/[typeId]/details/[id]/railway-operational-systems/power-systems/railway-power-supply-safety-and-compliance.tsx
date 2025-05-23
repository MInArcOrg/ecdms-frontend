import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance
);

const RailwayPowerSupplySafetyAndCompliancePage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayOperationalSystems}
            activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplySafetyAndCompliance}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Railway Power Supply Safety and Compliance Placeholder</div>
        </ProjectLayout>
    );
};

RailwayPowerSupplySafetyAndCompliancePage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RailwayPowerSupplySafetyAndCompliancePage;