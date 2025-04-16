import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, powerGenerationIds } from '../(subMenuItems)';
import GeothermalPowerWellList from 'src/views/pages/projects/detail/other/electric-power/geothermal-power-well';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    powerGenerationIds.geothermalEnergy.geothermalPowerWells
);

const GeothermalPowerWellsPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        powerGenerationIds.geothermalEnergy.geothermalPowerWells
    );

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.powerGeneration}
            activeSubMenuId={powerGenerationIds.geothermalEnergy.geothermalPowerWells}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <GeothermalPowerWellList
                otherSubMenu={menuItem}
                typeId={String(typeId)}
                projectId={String(id)}
            />
        </ProjectLayout>
    );
};

// Access control configuration
GeothermalPowerWellsPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default GeothermalPowerWellsPage;