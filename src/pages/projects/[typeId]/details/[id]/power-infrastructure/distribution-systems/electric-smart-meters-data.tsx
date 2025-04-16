import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerInfrastructureIds } from '../(subMenuItems)';
import ElectricSmartMetersDataList from 'src/views/pages/projects/detail/other/electric-power/electric-smart-meters-data';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    powerInfrastructureIds.distributionSystems.electricSmartMetersData
);

const ElectricSmartMetersDataPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        powerInfrastructureIds.distributionSystems.electricSmartMetersData
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.powerInfrastructure}
            activeSubMenuId={powerInfrastructureIds.distributionSystems.electricSmartMetersData}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <ElectricSmartMetersDataList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
ElectricSmartMetersDataPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default ElectricSmartMetersDataPage;