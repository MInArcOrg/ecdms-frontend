import { useRouter } from 'next/router';
import ProjectLayout from 'src/views/pages/projects/detail/layout/project-layout';
import { projectMenuIds } from 'src/views/pages/projects/detail/layout/project-menu-items';
import subMenuItems, { findSubMenuItem, railwayOperationalSystemsIds } from '../(subMenuItems)';

const defaultMenuItem = findSubMenuItem(
    subMenuItems('', ''),
    railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors
);

const RailwayPowerSupplyEnvironmentalAndOtherFactorsPage = () => {
    const router = useRouter();
    const { id = '', typeId = '' } = router.query;

    const menuItem = findSubMenuItem(
        subMenuItems(id as string, typeId as string),
        railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors
    );
    menuItem;

    return (
        <ProjectLayout
            activeMenuId={projectMenuIds.railwayOperationalSystems}
            activeSubMenuId={railwayOperationalSystemsIds.powerSystems.railwayPowerSupplyEnvironmentalAndOtherFactors}
            subMenuItems={subMenuItems(id as string, typeId as string)}
        >
            <div>Railway Power Supply Environmental and Other Factors Placeholder</div>
        </ProjectLayout>
    );
};

RailwayPowerSupplyEnvironmentalAndOtherFactorsPage.acl = {
    subject: defaultMenuItem?.model,
    action: 'view'
};

export default RailwayPowerSupplyEnvironmentalAndOtherFactorsPage;